import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import chalk from "chalk";
import { IRoutes } from "./routes";

const isTsEnvironment =
    process.env.TS_NODE_DEV !== undefined ||
    process.env.TS_NODE_PROJECT !== undefined;

export async function loadActiveRoutes(): Promise<any[]> {
    const routesRootPath = resolve(__dirname);
    const versions = readdirSync(routesRootPath).filter((folder) => {
        const fullPath = join(routesRootPath, folder);
        return statSync(fullPath).isDirectory() && /^v\d+$/.test(folder);
    });

    const activeRoutes = [];

    for (const version of versions) {
        const versionPath = join(routesRootPath, version);
        const routeFiles = readdirSync(versionPath).filter(
            (file) =>
                file.endsWith(".routes.ts") || file.endsWith(".routes.js"),
        );

        const versionRoutes = [];

        for (const file of routeFiles) {
            let filePath = join(versionPath, file);

            if (!isTsEnvironment) {
                filePath = filePath.replace(/\.ts$/, ".js");
            }

            const importedModule = isTsEnvironment
                ? require(filePath)
                : await import(filePathToImportPath(filePath));

            const exportedRoutes = Object.values(importedModule) as IRoutes[];

            for (const routeFileExport of exportedRoutes) {
                if (Array.isArray(routeFileExport)) {
                    for (const route of routeFileExport) {
                        if (route.activate) {
                            versionRoutes.push(...route.routes);
                        }
                    }
                } else if (routeFileExport.activate) {
                    versionRoutes.push(...routeFileExport.routes);
                }
            }
        }

        if (versionRoutes.length > 0) {
            console.log(chalk.bold.green(`✅ Routes mapped on ${version}:`));
            versionRoutes.forEach((route) => {
                let methodColor = chalk.white;
                const method = route.method.toUpperCase();
                if (method === "POST") methodColor = chalk.green;
                if (method === "GET") methodColor = chalk.blue;
                if (method === "PUT") methodColor = chalk.yellow;
                if (method === "DELETE") methodColor = chalk.red;

                console.log(`  ${methodColor(`[${method}]`)} ${route.url}`);
            });
        }

        activeRoutes.push(...versionRoutes);
    }

    return activeRoutes;
}

function filePathToImportPath(path: string) {
    return path.replace(/\\/g, "/").startsWith("/")
        ? `file://${path.replace(/\\/g, "/")}`
        : `file:///${path.replace(/\\/g, "/")}`;
}
