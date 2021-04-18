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
      select: { style: "os", items: "cell"},
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

    this.table.on( 'select', function ( e, dt, type, indexes ) {

      console.log("Yes - money. 'select' fired off");
      /*if ( type === 'row' ) {
         // var data = this.table.rows( indexes ).data().pluck( 'id' );
         console.log("Cell was just selected with data type", type,)
   
         
      } */
  } ); 

  }


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
