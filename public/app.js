console.log("hello");



var ProductTable = React.createClass({
  getInitialState: function(){//initialize the state first, can declare anything, 1st step
    return {
      products: []
    }
  },

  loadProductsFromServer: function() { //getting data from server, 2nd step
    var self = this;
    $.ajax({
      url: this.props.url,
      method: 'GET'
    }).done(function(data){
      self.setState({
        products: data//updates array with our data
      })
    }.bind(this));
  },

  propTypes: {
    url: React.PropTypes.string.isRequired,
  },

  componentDidMount: function() {//updates with current data, 3rd step 
    this.loadProductsFromServer();
  },

  render: function() {
    return (
      <div>
        <ProductList products={this.state.products} />
      </div>
      )
  }
});
 //this.props. = always look at my direct parent, not in the same componenet 
 //state = look within the local scope getInitialState; states can be born & updated

{/* 
Filter through products and map only products in stock..
Replace the table body section with dynamic data.
*/}  
var filterProduct = function(product){
  return product.inStock = true;
};
var  ProductList = React.createClass({
  render: function() {
    var self = this;
    var productList = this.props.products.filter(filterProduct).map(function(product){
       
        return(
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name of Product</th>
                <th>Cost of Product</th>
                <th>In Stock Product</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td> {product.name} </td>
              <td> {product.cost} </td>
              <td> {product.inStock.toString()} </td>
            </tr>
            </tbody>
          </table>
        </div>
          )
        
      })
    return(
      <div>
      
        {productList}
      </div>
      )
  }
});

React.render(<ProductTable url = '/api/products'/>, document.getElementById('react-container'));
{/* WHICH URL IS USED TO GET ALL PRODUCTS? */}