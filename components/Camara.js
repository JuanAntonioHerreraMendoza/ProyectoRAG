import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import ButtonCamera from "./ButtonCamera";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Video } from "expo-av";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function Camara({ navigation, route }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const microphoneStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      setHasMicrophonePermission(microphoneStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({skipProcessing: true});
        setImage(data.uri);
      } catch (error) {
        alert(error);
      }
    }
  };

  const takeVideo = async () => {
    setIsRecording(true);
    setIsPlaying(true);
    let options = {
      quality: "720p",
      maxDuration: 60,
      mute: false,
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };

  const stopVideo = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  const saveVideo = async () => {
    if (video) {
      try {
        navigation.navigate({
          name: "ReporteForm",
          params: { uri: video.uri, video: true },
          merge: true,
        });
        setVideo(null);
      } catch (error) {
        alert.log(error);
      }
    }
  };

  const savePicture = async () => {
    if (image) {
      imagenes.push(image);
      setImage(null);
      if (imagenes.length === 3) {
        alert("Tomaste el maximo de fotos permitidas");
        try {
          navigation.navigate({
            name: "ReporteForm",
            params: { uri: imagenes, video: false },
            merge: true,
          });
          setImage(null);
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  const savePictureExit = async () => {
    if (image) {
      imagenes.push(image);
      setImage(null);
      try {
        navigation.navigate({
          name: "ReporteForm",
          params: { uri: imagenes, video: false },
          merge: true,
        });
        setImage(null);
      } catch (error) {
        alert(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No se concedieron permisos a la camara</Text>;
  }

  return (
    <View style={styles.container}>
      {!image && !video ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
          useCamera2Api
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >{!isRecording?<>
            <ButtonCamera
              title=""
              icon="cross"
              onPress={() => {
                navigation.navigate("ReporteForm");
              }}
            />
            <ButtonCamera
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
            /></>:<></>}
          </View>
        </Camera>
      ) : video ? (
        <Video
          style={styles.camera}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      <View style={styles.controls}>
        {image || video ? (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <ButtonCamera
                title="Tomar de nuevo"
                onPress={() => {
                  setImage(null);
                  imagenes.pop();
                  setVideo(null);
                }}
                icon="retweet"
              />
              <ButtonCamera
                title="Guardar"
                onPress={image ? savePicture : saveVideo}
                icon="check"
              />
            </View>
            {!video ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <ButtonCamera
                    title="Guardar y salir"
                    onPress={savePictureExit}
                    icon="check"
                  />
                </View>
                <Text style={{ color: "white", textAlign: "right" }}>
                  Foto {imagenes.length} de 3 disponibles
                </Text>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            {!isRecording ? (
              <>
                <ButtonCamera
                  title="Capturar foto"
                  onPress={takePicture}
                  icon="camera"
                />
                {imagenes.length >= 1 ? (
                  <></>
                ) : (
                  <ButtonCamera
                    title="Capturar Video"
                    onPress={takeVideo}
                    icon="controller-record"
                  />
                )}
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 50,
                }}
              >
                <ButtonCamera
                  title="Detener"
                  onPress={stopVideo}
                  icon="controller-record"
                />
                <View style={{ marginLeft: "20%" }}>
                  <CountdownCircleTimer
                    isPlaying={isPlaying}
                    duration={60}
                    size={70}
                    colors={["#21AE08", "#A6AE08", "#B46B09", "#B42509"]}
                    colorsTime={[60, 45, 30, 0]}
                    onComplete={() => ({ shouldRepeat: false, delay: 2 })}
                    updateInterval={1}
                  >
                    {({ remainingTime, color }) => (
                      <Text style={{ color, fontSize: 20 }}>
                        {remainingTime}
                      </Text>
                    )}
                  </CountdownCircleTimer>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000",
    padding: 8,
  },
  controls: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
