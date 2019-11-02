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
  }
});

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <Content padder style={style.content}>
          <Card>
            <CardItem cardBody>
              <Image style={style.image} source={require('../images/logo.png')} />
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>Sorry — something gone wrong.</Text>
                <Text>Our team has been notified, but click here fill out a report.</Text>
                <Button
                  className="snap"
                  onClick={() => Sentry.lastEventId() && Sentry.showReportDialog()}
                >
                  <Text>Error</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      );
    }
    //when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
