"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
function main() {
    let port = app_1.app.get('PORT');
    app_1.app.listen(port, () => {
        console.log(`server is run http:localhost:${port}`);
    });
}
;
main();
