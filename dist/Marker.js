import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

class MapViewMarker extends Component {

  constructor(props){
    super(props);

    this.makerWithLabel = React.createRef();
    this.makerWithLabelChild = React.createRef();

    this.state = {
      labelCenterPoint : {
        x : 0,
        y : 0
      }
    }
  }

  componentDidMount(){
    if(this.props.children){
      let _this = this;
      setTimeout(function(){
        if(_this.makerWithLabelChild.current != null){
          _this.setState({
            labelCenterPoint : {
              x : _this.makerWithLabelChild.current.offsetWidth / 2,
              y : _this.makerWithLabelChild.current.offsetHeight / 2
            }
          })
        }
      }, 300);
    }
  }

  render() {
    if(this.props.children){
      return (
        <MarkerWithLabel
          position={{ lat: this.props.coordinate.latitude, lng: this.props.coordinate.longitude }}
          labelAnchor={new google.maps.Point(this.state.labelCenterPoint.x, this.state.labelCenterPoint.y)}
          opacity={0}
        >
          <div ref={this.makerWithLabelChild}>
            {this.props.children}
          </div>
        </MarkerWithLabel>
      );
    }

    return (
      <Marker
        draggable={this.props.draggable}
        onDragEnd={this.props.onDragEnd}
        title={this.props.description ? `${this.props.title}\n${this.props.description}` : this.props.title}
        position={{ lat: this.props.coordinate.latitude, lng: this.props.coordinate.longitude }}
        opacity={typeof this.props.opacity != "undefined" ? this.props.opacity : 1}
      >
      </Marker>
    );
  }
}

export default MapViewMarker;