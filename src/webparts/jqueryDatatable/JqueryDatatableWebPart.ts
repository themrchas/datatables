import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JqueryDatatableWebPart.module.scss';
import * as strings from 'JqueryDatatableWebPartStrings';




//import * as DataTable from "datatables.net";
//import $ from "jquery";
import jQuery = require("jquery");
//$ = jQuery;
//import 'datatables.net-dt/css/jquery.dataTables.css'
//import  dtt = require( 'datatables.net' );
//import $ = require( 'datatables.net' );

import 'datatables.net';
//import 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import  'datatables.net-select';

//import select = require( 'datatables.net-select' )( window, $ );



//var dt = dtt();

import TableData from './TableData';
import testFunc from './JqueryPlugin';


export interface IJqueryDatatableWebPartProps {
  description: string;
}



export default class JqueryDatatableWebPart extends BaseClientSideWebPart<IJqueryDatatableWebPartProps> {

 private rows:  any; 
  private table: any; 

  public render(): void {

   

    (function($) {
      console.log("iief fired off with '$'", $);
      console.log("$.fn.dataTable.ext.type.detect[0] is",$.fn.dataTable.ext.type.detect[0] );

      $.fn.dataTable.ext.type.detect.unshift(function (value) {

        console.log("$.fn.dataTable.ext.type.detect[0] after unshift is",$.fn.dataTable.ext.type.detect[0] );

          if (/^\d\d\d$/.test(value))
            return 'beavis'

          return null;
      })
      
    })(jQuery);

    this.domElement.innerHTML = TableData.templateHtml ;

    this.table = jQuery("#table_id").DataTable({
      //"select": true,
      select: { style: "single", items: "cell"},
      columnDefs:[
        {targets: 0,  name:"Descriptive Name"},
        {targets: 1, visible:false},
        {targets: 2, type:"beavis"}
      ] 
    });


   // console.log("jQuery.fn.dataTable.select is",jQuery.fn.dataTable.select);
    console.log("this.table is", this.table);

    console.log("this.table.data is",this.table.data());

    console.log('jQuery.fn.Datable is',jQuery.fn.DataTable);

    this.rows = this.table.cells(function ( idx, data, node ) {
      console.log("'idx'",idx,"'data'",data,"'node'",node);
      return true;
    });

  /*  this.table.on( 'select', function ( e, dt, type, indexes ) {

      console.log("Yes - money. 'select' fired off");
      //if ( type === 'row' ) {
         // var data = this.table.rows( indexes ).data().pluck( 'id' );
         console.log("Cell was just selected with 'e'", e);
         console.log("Cell was just selected with data type", type);
         console.log("Cell was just selected with 'dt'", dt);
         console.log("Cell was just selected with 'indexes[0]'", indexes[0]);
         console.log("Cell was just selected with 'this'", this);
         console.log("Cell was just selected with 'this.table'", this.table);
         console.log("Cell value is", this.table.cell(1,0).data());
   
         
    //  } 
  } ); */

 /* this.table.on ('select', ( e, dt, type, indexes ) => {
    console.log("Cell was just selected with 'e'", e);
         console.log("Cell was just selected with data type", type);
         console.log("Cell was just selected with 'dt'", dt);
         console.log("Cell was just selected with 'indexes[0]'", indexes[0]);
         console.log("Cell was just selected with 'this'", this);
         console.log("Cell was just selected with 'this.table'", this.table);
         console.log("Cell value is", this.table.cell(indexes[0].row,indexes[0].column).data());
        // this.table.cell(1,0).data("yes - money");
        // console.log("Cell value is",this.table.cell(this).data());
  }); */


  //Setting background cell color with jQuery
/*  jQuery("#table_id").on("click","td",function(event) {

    console.log("Event is",event, "and 'this' is",this );
    console.log("Event 'this' text is",jQuery(this).text());
    jQuery(this).addClass("styles.clicked");
  } ) */





  this.table.on('select.dt',  ( e, dt, type, indexes )  => {
    
      console.log("select: jQuery event object is 'e'", e);
      console.log("select: DataTables API instance is 'dt'", dt);
      console.log("select: type is 'type'", type);
      console.log("select: indexes of selected item is 'indexes'", indexes);
      console.log("select: cell data is",this.table.cell(indexes).data());

      console.log("select: 'this' is", this);

      this.table.cell(indexes).addClass("${styles.clicked}");  //.addClass(styles.clicked);
      


    });

  } //render

  


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
