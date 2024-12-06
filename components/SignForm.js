import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { TokenContext } from "../store/store";
import { registerAdmin, registerUser } from "../backend/register/api";
import { login } from "../backend/login/api";

function SignForm({ signupOrLogin }) {
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [passWordValidation, setPasswordValidation] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [who, setWho] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const Navigator = useNavigation();
  const tokenContext = useContext(TokenContext);

  async function doLogin(url, email, password, role) {
    const { token } = await login(tokenContext.url, email, password);
    console.log(token);
    tokenContext.setToken(token);
    setIsLogin(true);
    // if (role === " 일반") Navigator.replace("Drawer");
    // else Navigator.replace("OwnerMainScreen");
  }
  async function doRegister(url, email, password, role) {
    if (role === "일반") await registerUser(tokenContext.url, email, passWord);
    else await registerAdmin(tokenContext.url, email, passWord);

    await doLogin(url, email, password);

    if (role === "일반") Navigator.replace("CustomerSurvey");
    else Navigator.replace("OwnerRegister");
  }

  function emailInputHandler(enteredEmail) {
    setEmail(enteredEmail);
    console.log(email);
  }
  function passwordInputHandler(enteredPassword) {
    setPassword(enteredPassword);
  }
  function onRegisterHandler(who) {
    if (email === "") {
      Alert.alert("제출 오류", "올바른 이메일을 입력해주세요.");
      return;
    }
    if (emailCheck && passWord === "") {
      Alert.alert("제출 오류", "올바른 패스워드를 입력해주세요.");
      return;
    }
    if (who === "일반") {
      if (emailCheck === false) {
        // 이메일 중복 체크
        setEmailCheck(true);
      } else {
        if (passWord === passWordValidation) {
          // 유저 등록
          setPwCheck(true);

          doRegister(tokenContext.url, email, passWord, "일반");
        } else {
          Alert.alert(
            "패스워드 오류",
            "패스워드가 일치하지 않습니다. 다시 입력하십시오."
          );
        }
      }
    } else {
      //  사장 회원가입
      if (emailCheck === false) {
        // 이메일 중복 체크
        setEmailCheck(true);
      } else {
        if (passWord === passWordValidation) {
          // 사장 등록
          setPwCheck(true);
          doRegister(tokenContext.url, email, passWord, "사장");
        } else {
          alert(
            "패스워드 오류",
            "패스워드가 일치하지 않습니다. 다시 입력하십시오."
          );
        }
      }
    }
    // 회원가입 데이터 전송
  }
  function onLoginHandler(who) {
    // console.log(who);
    //API로 Spring에 submit
    if (email === "" || passWord === "") {
      Alert.alert("제출 오류", "이메일 또는 패스워드를 입력해주세요.");
      return;
    }
    // JWT Problem
    // login(tokenContext.url, tokenContext.getToken(), email, passWord)
    //   .then((response) => response.data())
    //   .then((token) => {
    //     tokenContext.addToken(token);
    //   })
    //   .catch((error) => {
    //     Alert.alert("email 또는 비밀번호가 올바르지 않습니다.");
    //     return;
    //   });
    // 로그인 데이터 전송
    if (who === "일반") {
      (async () => {
        await doLogin(tokenContext.url, email, passWord);
        tokenContext.setRole("customer");
        Navigator.replace("Drawer");
      })();
    } else {
      (async () => {
        await doLogin(tokenContext.url, email, passWord);
        tokenContext.setRole("owner");
        Navigator.replace("OwnerMainScreen");
      })();
    }
    setEmail("");
    setPassword("");
  }
  return (
    <View>
      <View style={styles.inputOuterContainer}>
        <TextInput
          style={styles.inputContainer}
          value={email}
          onChangeText={emailInputHandler}
          placeholder="이메일"
          editable={!emailCheck}
        />
        {emailCheck && (
          <Text style={{ fontSize: 10, color: "green" }}>
            사용 가능한 이메일입니다.
          </Text>
        )}
        {signupOrLogin === "로그인" || emailCheck ? (
          <TextInput
            style={styles.inputContainer}
            value={passWord}
            onChangeText={passwordInputHandler}
            placeholder="패스워드"
            secureTextEntry={true}
          />
        ) : null}

        {signupOrLogin === "회원가입" && emailCheck ? (
          <TextInput
            style={styles.inputContainer}
            value={passWordValidation}
            onChangeText={setPasswordValidation}
            placeholder="패스워드 확인"
            secureTextEntry={true}
          />
        ) : null}
      </View>

      <View style={styles.buttonsContainer}>
        {(!emailCheck || who == "일반") && (
          <PrimaryButton
            onPress={() => {
              setWho("일반");
              switch (signupOrLogin) {
                case "로그인":
                  onLoginHandler("일반");
                  break;
                case "회원가입":
                  onRegisterHandler("일반");
                  break;
              }
            }}
          >
            일반 {signupOrLogin}
          </PrimaryButton>
        )}
        {(!emailCheck || who == "사장님") && (
          <PrimaryButton
            onPress={() => {
              setWho("사장님");
              switch (signupOrLogin) {
                case "로그인":
                  onLoginHandler("사장님");
                  break;
                case "회원가입":
                  onRegisterHandler("사장님");
                  break;
              }
            }}
          >
            사장님 {signupOrLogin}
          </PrimaryButton>
        )}
      </View>
    </View>
  );
}
export default SignForm;

const styles = StyleSheet.create({
  inputOuterContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    width: 300,
    height: 50,
    borderBottomWidth: 2,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
});
