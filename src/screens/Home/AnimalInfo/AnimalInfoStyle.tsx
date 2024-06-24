
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttons: {
    backgroundColor: "rgb(232, 255, 233)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonsFuature: {
    backgroundColor: "#eff0ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
    borderWidth: 2,
    borderColor: "purple",
    borderStyle: "dashed",
  },
  buttonsInformation: {
    backgroundColor: "rgb(232, 255, 233)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTexts: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    flex: 7,
  },
  buttonTextsFueture: {
    fontSize: 18,
    fontWeight: "bold",
    color: "purple",
  },
  idstyle: {
    display: "flex",
    fontWeight: "bold",
    marginTop: 20,
    padding: 5,
  },
  buttonIcon: {
    marginLeft: 10,
    color: "black",
    flex: 1,
  },
  deleteButton: {
    fontSize: 20,
    padding: 15,
    color: "red",
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
