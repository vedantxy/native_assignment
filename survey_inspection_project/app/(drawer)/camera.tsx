import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  Image, 
  Alert, 
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const [captureTime, setCaptureTime] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  
  // Use any to avoid complex typing for the camera ref in this quick implementation
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="camera-outline" size={64} color="#ccc" style={{ marginBottom: 20 }} />
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Pressable style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photoData = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setPhoto(photoData.uri);
        
        // Record capture time
        const now = new Date();
        setCaptureTime(now.toLocaleString());
      } catch (error) {
        Alert.alert("Error", "Failed to capture photo.");
      }
    }
  };

  const handleRetake = () => {
    setPhoto(null);
    setCaptureTime(null);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            setPhoto(null);
            setCaptureTime(null);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!photo ? (
        <View style={styles.cameraContainer}>
          <CameraView 
            style={styles.camera} 
            facing="back"
            ref={cameraRef}
            onCameraReady={() => setIsCameraReady(true)}
          >
            {/* Loading Indicator While Opening Camera */}
            {!isCameraReady && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Initializing Camera...</Text>
              </View>
            )}

            {/* Camera Controls Overlay */}
            <View style={styles.cameraControls}>
              <View style={styles.header}>
                <Text style={styles.headerText}>Take Inspection Photo</Text>
              </View>
              <View style={styles.bottomBar}>
                <Pressable 
                  style={({ pressed }) => [
                    styles.captureButton,
                    pressed && { opacity: 0.7 }
                  ]} 
                  onPress={takePicture}
                  disabled={!isCameraReady}
                >
                  <View style={styles.captureButtonInner} />
                </Pressable>
              </View>
            </View>
          </CameraView>
        </View>
      ) : (
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Photo Preview</Text>
          
          <View style={styles.imageWrapper}>
            <Image source={{ uri: photo }} style={styles.previewImage} />
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
              <Text style={styles.timeText}>{captureTime}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <Pressable style={[styles.actionBtn, styles.retakeBtn]} onPress={handleRetake}>
              <Ionicons name="refresh-outline" size={24} color="#fff" />
              <Text style={styles.actionBtnText}>Retake</Text>
            </Pressable>
            
            <Pressable style={[styles.actionBtn, styles.deleteBtn]} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={24} color="#fff" />
              <Text style={styles.actionBtnText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  permissionButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cameraContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    justifyContent: 'center',
  },
  previewTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 3/4,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  timeBadge: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retakeBtn: {
    backgroundColor: '#4F46E5',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
