import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import mailGif from "../../../assets/Gifs/mail.gif";
import {
  setEmail,
  reSetError,
  reSetSuccsess,
  setCode,
  setNewPassword,
  RecoveryType,
} from "../../../Store/PasswordRecovery/PasswordRecovery.slice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";
import { ErrorPopup, SuccessPopup } from "../../COMPONENTS/Status/StatusSucErr";
import {
  CheckConfirmationCode,
  PasswordRecoveryByEmail,
  ResetPasswordByAuthCode,
} from "../../../Store/PasswordRecovery/PasswordRecovery.thunk";
import { useNavigation } from "@react-navigation/native";
interface Props {
  onNext: () => void;
}

const EnterEmailStep: React.FC<Props> = ({ onNext }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { email } = useSelector((state: any) => state.RecoveryReducer);

  const handleEmailEntered = async () => {
    await dispatch(PasswordRecoveryByEmail(email));
    onNext();
  };

  return (
    <View style={styles.firsStepView}>
      <View style={styles.emailGifView}>
        <Image style={styles.emailGifImg} source={mailGif} />
      </View>
      <View style={styles.firsStepViewWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.paragraph}>
            Don't worry! it happens, Please enter the email address associated
            with your account
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => dispatch(setEmail(text))}
        />
        <TouchableOpacity style={styles.button} onPress={handleEmailEntered}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EnterCodeStep: React.FC<Props> = ({ onNext }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { RecoveryObj } = useSelector((state: any) => state.RecoveryReducer);
  const { Code } = RecoveryObj;
  const handleCodeEntered = async () => {
    await dispatch(CheckConfirmationCode(Code));
    onNext();
  };

  return (
    <>
      <Text style={styles.infoText}>
        We've sent a recovery code to your email. Please check your email.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Recovery Code"
        value={Code}
        onChangeText={(text) => dispatch(setCode(Number(text)))}
      />
      <Button title="Submit Code" onPress={handleCodeEntered} />
    </>
  );
};

const EnterNewPasswordStep: React.FC = () => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { RecoveryObj } = useSelector((state: any) => state.RecoveryReducer);
  const { NewPassword, Code } = RecoveryObj as RecoveryType;

  const handleResetPassword = async () => {
    await dispatch(ResetPasswordByAuthCode({ NewPassword, Code }));
    navigation.navigate(`Home`);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={NewPassword}
        onChangeText={(text) => dispatch(setNewPassword(text))}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </>
  );
};

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const reSetStatus = (type: string) => {
    if (type == "error") {
      dispatch(reSetError());
    } else if (type == "succsess") {
      dispatch(reSetSuccsess());
    }
  };
  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const { loading, error, success } = useSelector(
    (state: any) => state.RecoveryReducer
  );

  if (loading) {
    return <LoadingAnimation />;
  } else {
    return (
      <View style={styles.container}>
        {step === 1 && <EnterEmailStep onNext={handleNextStep} />}
        {step === 2 && <EnterCodeStep onNext={handleNextStep} />}
        {step === 3 && <EnterNewPasswordStep />}
        <ErrorPopup message={error} onClose={() => reSetStatus("error")} />
        <SuccessPopup
          message={success}
          onClose={() => reSetStatus("succsess")}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    color: "white",
  },
  paragraph: { color: "#2C3F51", fontSize: 17, textAlign: "center" },
  title: {
    color: "#2C3F51",
    fontSize: 24,
    marginBottom: 20,
  },
  infoText: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  firsStepView: {
    padding: 10,
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
    backgroundColor: "#ffcd38",
  },
  firsStepViewWrapper: {
    display: "flex",
    justifyContent: "space-around",
    height: "60%",
    top: 120,

    width: "100%",
  },
  emailGifView: {
    position: "absolute",
    right: 130,
    top: -70,
  },
  emailGifImg: {
    width: 320,
    height: 320,
  },

  // BUTTON
  button: {
    backgroundColor: "#2C3F51",

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#EBEEEF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ForgotPassword;