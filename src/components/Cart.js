import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addToCart } from '../actions/AppActions';
import EmptyCart from "./common/EmptyCart";
import CartButton from "./common/CartButton";
import Checkout from "../components/Checkout";
import FooterCheckout from "../components/FooterCheckout";

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  handleNaviagation = () => {
    this.props.navigation.navigate("Billing");
  };
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pedido",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#32a852',
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  };
  render() {
    if (this.props.qtd_carrinho == 0) {
      return <EmptyCart />;
    } else {
      return (
        <View>
          <Checkout />
          <FooterCheckout handleNaviagation={this.handleNaviagation} />
        </View>
      );
    }


  }
}


const mapStateToProps = state => ({
  qtd_carrinho: state.AppReducer.qtd_carrinho,
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader
});
const mapDispatchToProps = dispatch => bindActionCreators({ addToCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Cart);