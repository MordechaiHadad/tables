export class Tables {
    private element: HTMLElement;
    private elementType: ElementType;
    private styling: {
        tableContainer?: string[];
        table?: string[];
        tableHeaders?: string[];
        tableData?: string[];
    };
    private _data: string[][];

    constructor(
        id: string,
        props: { headers: string[]; data: string[][] } = {
            headers: [],
            data: [],
        },
        styling: {
            tableContainer?: string[];
            table?: string[];
            tableHeaders?: string[];
            tableData?: string[];
        } = { table: [], tableHeaders: [], tableData: [], tableContainer: [] }
    ) {
        this._data = this.createProxy(props.data);
        this.styling = styling;
        this.element = document.getElementById(id)!;
        this.elementType =
            this.element.nodeName === "TABLE"
                ? ElementType.Table
                : ElementType.Div;

        let tableElement =
            this.elementType === ElementType.Table
                ? this.element
                : document.createElement("table");

        if (this.elementType === ElementType.Div && styling.tableContainer)
            this.element.classList.add(...styling.tableContainer);

        if (styling.table) tableElement.classList.add(...styling.table);

        // headers
        let thead = document.createElement("thead");
        let trHeaders = document.createElement("tr");
        thead.appendChild(trHeaders);
        props.headers.forEach((value) => {
            let th = document.createElement("th");
            if (styling.tableHeaders) th.classList.add(...styling.tableHeaders);
            th.textContent = value;
            trHeaders.appendChild(th);
        });
        tableElement.appendChild(thead);

        // body
        let tbody = document.createElement("tbody");
        props.data.forEach((value) => {
            let tr = document.createElement("tr");
            value.forEach((value) => {
                let td = document.createElement("td");
                if (styling.tableData) td.classList.add(...styling.tableData);
                td.textContent = value;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        tableElement.appendChild(tbody);

        if (this.elementType === ElementType.Div)
            this.element.appendChild(tableElement);
    }

    get data(): string[][] {
        return this._data;
    }

    set data(newData: string[][]) {
        this._data = this.createProxy(newData);
        this.updateTable();
    }

    private createProxy(data: string[][]) {
        return new Proxy(data, {
            set: (target, property, value) => {
                Reflect.set(target, property, value);
                if (property.toString() === "length") this.updateTable();
                return true;
            },
        });
    }

    private updateTable() {
        // Clear the table body
        this.element.querySelector("tbody")!.innerHTML = "";

        // Add new rows based on the current data
        this._data.forEach((value) => {
            let tr = document.createElement("tr");
            value.forEach((value) => {
                let td = document.createElement("td");
                if (this.styling.tableData)
                    td.classList.add(...this.styling.tableData);
                td.textContent = value;
                tr.appendChild(td);
            });
            this.element.querySelector("tbody")!.appendChild(tr);
        });
    }
}

enum ElementType {
    Table,
    Div,
}
