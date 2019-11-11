import { withTranslation } from 'react-i18next';
import * as Sentry from 'sentry-expo';
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import {
  Content, Button, Text, Card, CardItem, Body
} from 'native-base';

const style = StyleSheet.create({
  content: {
    height: '100%'
  },
  image: {
    alignSelf: 'stretch',
    resizeMode: 'contain',
    height: 125,
    width: null,
    flex: 1
  },
  button: {
    marginTop: 5,
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
});

class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
      submitted: false
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  handleErrorSubmit() {
    Sentry.captureException(
      this.state.error, { extra: this.state.errorInfo }
    );
    this.setState({ submitted: true });
  }

  render() {
    if (this.state.error) {
      return (
        <Content padder style={style.content}>
          <Card>
            <CardItem cardBody>
              <Image style={style.image} source={require('../images/logo.png')} />
            </CardItem>
            <CardItem bordered header>
              <Text>{this.props.t('pages.globalErrorBoundary.header')}</Text>
            </CardItem>            
            <CardItem bordered>
              <Body>
                <Text>{this.props.t('pages.globalErrorBoundary.text')}</Text>
                <Button
                  style={style.button}
                  onPress={() => this.handleErrorSubmit()}
                >
                  <Text>{this.props.t('pages.globalErrorBoundary.buttonSubmit')}</Text>
                </Button>
              </Body>
            </CardItem>
            {this.state.submitted
              && (
                <CardItem bordered>
                  <Body>
                    <Text>{this.props.t('pages.globalErrorBoundary.replyText')}</Text>
                  </Body>
                </CardItem>
              )          
            }
          </Card>
        </Content>
      );
    }
    return this.props.children;
  }
}

export default withTranslation()(GlobalErrorBoundary);
