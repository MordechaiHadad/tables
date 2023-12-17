export class Tables {
    element: HTMLTableElement;
    props: {} = {};
    styling: { table: string[] } = { table: [] };

    constructor(
        id: string,
        props: { headers: string[]; data: string[][] },
        styling: {
            table: string[];
            tableHeaders: string[];
            tableData: string[];
        }
    ) {
        this.element = document.getElementById(id)! as HTMLTableElement;
        this.element.classList.add(...styling.table);

        // headers
        let thead = document.createElement("thead");
        let trHeaders = document.createElement("tr");
        thead.appendChild(trHeaders);
        props.headers.forEach((value) => {
            let th = document.createElement("th");
            th.classList.add(...styling.tableHeaders);
            th.textContent = value;
            trHeaders.appendChild(th);
        });
        this.element.appendChild(thead);

        // body
        let tbody = document.createElement("tbody");
        props.data.forEach((value) => {
            let tr = document.createElement("tr");
            value.forEach((value) => {
                let td = document.createElement("td");
                td.classList.add(...styling.tableData);
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        this.element.appendChild(tbody);
    }
}
