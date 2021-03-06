import React, { Component } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import PropTypes from "prop-types";
import createMenuData from "./createMenuData";

const styles = StyleSheet.create({
  menuHeader: {
    fontSize: 24,
    margin: 4,
    marginBottom: 8,
    color: "white",
    textAlign: "center"
  },
  sectionHeader: {
    fontSize: 22,
    margin: 4,
    marginBottom: 8,
    color: "white",
    textAlign: "center"
  },
  menuItem: {
    margin: 10,
    color: "gray",
    fontSize: 20
  },
  menuSeparator: {
    backgroundColor: "gray",
    height: StyleSheet.hairlineWidth,
    width: "90%",
    margin: 2
  }
});

const MenuSeparator = () => <View style={styles.menuSeparator} />;

export default class MenuList extends Component {
  constructor(props) {
    super(props);
    this.preparedMenuItems = createMenuData(props.menuItems);
  }

  render() {
    return (
      <View>
        <Text style={styles.menuHeader}>Component List</Text>
        <SectionList
          sections={this.preparedMenuItems}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item, index, section }) => (
            <View>
              <Text
                style={styles.menuItem}
                key={index}
                onPress={() => this.props.onMenuItemPress(section, item)}
              >
                {" "}
                {item}{" "}
              </Text>

              <MenuSeparator />
            </View>
          )}
        />
      </View>
    );
  }
}

MenuList.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMenuItemPress: PropTypes.func.isRequired
};
