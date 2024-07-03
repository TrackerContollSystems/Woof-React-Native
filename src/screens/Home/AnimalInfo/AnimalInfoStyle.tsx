import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: "white",
  },
  profileContainer: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsInformation: {
    // backgroundColor: "rgb(232, 255, 233)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
  },
  buttonTexts: {
    fontSize: 18,
  },
  buttonValue: {
    fontSize: 18,
    color: "black",
  },
  buttonsCreate: {
    backgroundColor: "#2C3F51",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonTextsCreate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginRight: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: "row",
    left: 75,
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "green",
  },
  modalButtonTexts: {
    fontSize: 16,
    color: "red",
  },
  idstyle: {
    display: "flex",
    fontWeight: "bold",
    marginTop: 20,
    padding: 5,
  },
  buttonsFuature: {
    backgroundColor: "#2C3F51",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
    borderWidth: 3,
    borderColor: "white",
    // borderStyle: "dashed",
  },
  buttonTextsFueture: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
