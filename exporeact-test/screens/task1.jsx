import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Animated,
  } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const task1 = () => {
    const [state, AnimationState] = React.useState({
        animationBackDrop: new Animated.Value(0),
        animationLecture: new Animated.Value(0),
        animationSection: new Animated.Value(0),
      });
      let iniSecArray = [
        {
          SectionName: "React-Native",
          lectures: ["react components", "react-redux"],
        },
        {
          SectionName: "Flutter",
          lectures: [],
        },
      ];
      const [sectionarray, changeSectionArray] = React.useState(iniSecArray);
      const [NewLecture, onChangeLecture] = React.useState("Add Lecture");
      const [NewSection, onChangeSection] = React.useState("Add Section");
      const [activeSection, setactiveSection] = React.useState("");
      const handleOpen = (Section) => {
        Animated.timing(state.animationBackDrop, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(state.animationLecture, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        setactiveSection(Section.SectionName);
      };
      const handleOpenSection = () => {
        Animated.timing(state.animationBackDrop, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(state.animationSection, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
      const handleClose = () => {
        Animated.timing(state.animationBackDrop, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
        Animated.timing(state.animationLecture, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        Animated.timing(state.animationSection, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      };
      const screenHeight = Dimensions.get("window").height;
      const backdrop = {
        transform: [
          {
            translateY: state.animationBackDrop.interpolate({
              inputRange: [0, 0.01],
              outputRange: [screenHeight, 0],
              extrapolate: "clamp",
            }),
          },
        ],
        opacity: state.animationBackDrop.interpolate({
          inputRange: [0.01, 0.5],
          outputRange: [0, 1],
          extrapolate: "clamp",
        }),
      };
      const slideUpLecture = {
        transform: [
          {
            translateY: state.animationLecture.interpolate({
              inputRange: [0.01, 1],
              outputRange: [0, -1 * 100],
              extrapolate: "clamp",
            }),
          },
        ],
      };
      const slideUpSection = {
        transform: [
          {
            translateY: state.animationSection.interpolate({
              inputRange: [0.01, 1],
              outputRange: [0, -1 * 100],
              extrapolate: "clamp",
            }),
          },
        ],
      };
      const addSection = () => {
        if (NewSection !== "") {
          changeSectionArray((iniSecArray) => [
            ...iniSecArray,
            { SectionName: NewSection, lectures: [] },
          ]);
          Animated.timing(state.animationSection, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          Animated.timing(state.animationBackDrop, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      };
      const addLecture = () => {
        if (NewLecture !== "") {
          let newArr = [...sectionarray];
          let index;
          for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].SectionName == activeSection) {
              index = i;
              break;
            }
          }
          newArr[index].lectures.push(NewLecture);
          changeSectionArray(newArr);
          Animated.timing(state.animationSection, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          Animated.timing(state.animationBackDrop, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      };
      return (
        <View style={styles.container}>
          {sectionarray.map((section, index) => {
            return (
              <View key={index} style={styles.sectionContainer}>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>{section.SectionName}</Text>
                  <TouchableOpacity onPress={() => handleOpen(section)}>
                    <Icon name="add-outline" color="green" size={35} />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={{ fontWeight: "bold" }}>Lectures:</Text>
                  {section.lectures.map((lectures, ind) => {
                    return (
                      <Text style={styles.subSection} key={ind}>
                        {lectures}
                      </Text>
                    );
                  })}
                </View>
              </View>
            );
          })}
          {/* Add Section Button */}
          <Animated.View>
            <TouchableOpacity onPress={handleOpenSection}>
              <View style={[styles.buttonStyles]}>
                <Text style={styles.buttontext}>Add Section</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
          {/* Backdrop */}
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
          />
          {/* SAVE Form - ADD Section */}
          <Animated.View style={[styles.saveForm, slideUpSection]}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => onChangeSection(text)}
              value={NewSection}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={handleClose} style={{ marginRight: 10 }}>
                <View style={[styles.buttonStyles, { backgroundColor: "red" }]}>
                  <Text style={styles.buttontext}>Close</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity onPress={addSection}>
                <View style={styles.buttonStyles}>
                  <Text style={styles.buttontext}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {/* SAVE Form - ADD Lecture */}
          <Animated.View style={[styles.saveForm, slideUpLecture]}>
            <TextInput
              style={styles.TextInput}
              onChangeText={(text) => onChangeLecture(text)}
              value={NewLecture}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={handleClose} style={{ marginRight: 10 }}>
                <View style={[styles.buttonStyles, { backgroundColor: "red" }]}>
                  <Text style={styles.buttontext}>Close</Text>
                </View>
              </TouchableOpacity>
    
              <TouchableOpacity onPress={addLecture}>
                <View style={styles.buttonStyles}>
                  <Text style={styles.buttontext}>Save</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {/* Container finish */}
        </View>
      );
}
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      sectionContainer: {
        width: Dimensions.get("window").width,
        paddingHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 10,
        backgroundColor: "#e1e1e1",
      },
      section: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      sectionText: {
        fontSize: 22,
      },
      addSecButton: { position: "absolute", right: 20, bottom: 30 },
      buttonStyles: { backgroundColor: "green", borderRadius: 5, padding: 10 },
      buttontext: { color: "#fff" },
      TextInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 200,
      },
      saveForm: {
        flexDirection: "row",
        height: 100,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        backgroundColor: "#fff",
        elevation: 13,
        position: "absolute",
        bottom: -99,
        left: 0,
        zIndex: 10,
      },
      cover: {
        backgroundColor: "rgba(0,0,0,.5)",
        zIndex: 5,
      },
    });

export default task1;