import {Component, Input, SimpleChange, OnChanges, Optional} from "@angular/core";
import {DataTable, PageEvent} from "./DataTable";

@Component({
    selector: "mfPaginator",
    template: `<ng-content></ng-content>`
})
export class Paginator implements OnChanges {

    @Input("mfTable") inputMfTable: DataTable;
    @Input("max") max: number;
    @Output() needLoad=new EventEmitter();
    private mfTable: DataTable;

    public activePage: number;
    public rowsOnPage: number;
    public dataLength: number = 0;
    public lastPage: number;

    public constructor(@Optional() private injectMfTable: DataTable) {
    }

    public ngOnChanges(changes: {[key: string]: SimpleChange}): any {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    }

    public setPage(pageNumber: number): void {
        if( (this.rowsOnPage * pagenumber)> this.max )
        {
            this.needLoad.emit(this.mfTable);
        }
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
        
    }

    public setRowsOnPage(rowsOnPage: number): void {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    }

    private onPageChangeSubscriber = (event: PageEvent)=> {
        this.activePage = event.activePage;
        this.rowsOnPage = event.rowsOnPage;
        this.dataLength = event.dataLength;
        this.lastPage = Math.ceil(this.max / this.rowsOnPage);
    };
}
