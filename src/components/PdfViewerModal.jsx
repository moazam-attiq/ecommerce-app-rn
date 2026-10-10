import React, { useState } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';

const { width, height } = Dimensions.get('window');

export default function PdfViewerModal({ visible, onClose, pdfUri }) {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>PDF Viewer</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pdfContainer}>
            {loading && (
              <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
            )}
            <Pdf
              source={{ uri: pdfUri, cache: true }}
              onLoadComplete={() => setLoading(false)}
              onError={error => console.error('PDF Error:', error)}
              style={styles.pdf}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.95,
    height: height * 0.9,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeBtn: {
    borderRadius: 5,
    padding: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 24,
  },
  pdfContainer: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  pdf: {
    flex: 1,
    width: width * 0.95,
    height: height * 0.9,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    zIndex: 10,
  },
});
