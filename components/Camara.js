import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import ButtonCamera from "./ButtonCamera";
import { Video } from "expo-av";

export default function Camara({ navigation, route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(null);
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
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {
        alert(error);
      }
    }
  };

  const takeVideo = async () => {
    setIsRecording(true);
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
    cameraRef.current.stopRecording()
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
      try {
        navigation.navigate({
          name: "ReporteForm",
          params: { uri: image },
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
      {!image&&!video ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
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
            />
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
        {image||video ? (
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
                <ButtonCamera
                  title="Capturar Video"
                  onPress={takeVideo}
                  icon="controller-record"
                />
              </>
            ) : (
              <ButtonCamera
                title="Detener"
                onPress={stopVideo}
                icon="controller-record"
              />
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
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
