export default class MyTableTemplate {
    public static templateHtml: string =  `
      
      <table id="table_id" class="display row-border">
      <thead>
          <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>Beavis</td>
              <td>687 Loser Ln.</td>
              <td>383</td>
          </tr>
          <tr>
              <td>Bart Simpson</td>
              <td>123 Homer Way</td>
              <td>555-555-9865</td>
          </tr>
          <tr>
          <td>Herman Munster</td>
          <td>321 Mockingbird Ln</td>
          <td>768-098-4356</td>
      </tr>
      </tbody>
  </table>
    </div>`;
}