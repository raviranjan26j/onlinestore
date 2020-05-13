import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BackendService } from '../../backend services/backend.service';

@Component({
  selector: 'adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit,OnDestroy  {

  dataSource: MatTableDataSource<any>;
  members:any[];
  toggleField:string;
  savedChanges=false;
  error:boolean=false;
  errorMessage:string="";
  dataLoading:boolean=false;
  private querySubscription;
  myDocData:any;


 @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns=['category','scategory','name','price','_id'];

  constructor(private _backendservice:BackendService) {
    this.dataSource = new MatTableDataSource(this.members);
   }

  ngOnInit(): void {
    this.toggleField="searchMode";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  toggle(filter?){
    if(!filter){ filter="searchMode" }
    else{ filter=filter;}
    this.toggleField=filter;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }




  getData(){
    this.dataLoading=true;
    this.querySubscription=this._backendservice.getProducts('oders')
    .subscribe(members=>{
      this.members=members;
      this.dataSource=new MatTableDataSource(members);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
  }

  getFilterData(filter){
    this.dataLoading=true;
    this.querySubscription=this._backendservice.getFilterProducts('orders',filter)
    .subscribe(members=>{
      this.members=members;
      this.dataSource=new MatTableDataSource(members);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
  }



  getFilterDate(test:any){

  }

  setData(formData){
    this.dataLoading=true;
    this.querySubscription=this._backendservice.setProducts('orders',formData)
    .subscribe(members=>{
      if(members){
        this.savedChanges=true;
      }
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
  }

  updateData(formData){
    this.dataLoading=true;
    this.querySubscription=this._backendservice.updateProducts('orders',formData)
    .subscribe(members=>{
      if(members){
        this.savedChanges=true;
      }
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
  }
  getDoc(docId){
    this.dataLoading=false;
    this.querySubscription=this._backendservice.getOneProductsDoc('orders',docId)
    .subscribe(res=>{
      if(res){
        this.myDocData=res;
        console.log(this.myDocData);
        this.toggle('editMode');
      }
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
  }
  deleteDoc(docId){
    if (confirm("Are you sure want to delete this picture ?")) {
    this.dataLoading=true;
    this.querySubscription=this._backendservice.delOneProductsDoc('orders',docId)
    .subscribe(res=>{
      if(res){
        this.toggle('searchMode');
      }
    },
    (error)=>{
      this.error=true;
      this.errorMessage=error.messages;
      this.dataLoading=false;
    },
    ()=>{
      this.error=false;
      this.dataLoading=false;
    }
    );
    }
  }

  ngOnDestroy() {

    if (this.querySubscription) {
        this.querySubscription.unsubscribe();
    }
}

}


