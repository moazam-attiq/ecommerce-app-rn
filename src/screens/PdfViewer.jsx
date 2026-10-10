import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import PdfViewerModal from '../components/PdfViewerModal';

export default function PdfViewer() {
  const [showPdf, setShowPdf] = useState(false);
  return (
    <View style={styles.container}>
      <Header title="PDF Viewer" showDrawer={true}/>
      <TouchableOpacity
        onPress={() => setShowPdf(true)}
        style={styles.pdfContainer}>
          <Text style={styles.overPdfText}>Check out this CV</Text>
        <Image
          style={styles.pdfLogo}
          source={require('../images/pdfIcon.png')}
        />
      </TouchableOpacity>
      <PdfViewerModal
        visible={showPdf}
        onClose={() => setShowPdf(false)}
        pdfUri={'bundle-assets://sample.pdf'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfContainer: {
    marginLeft: 40,
    marginTop: 40,
    borderRadius: 8,
    padding: 12,
  },
  pdfLogo: {
    width: 100,
    height: 100,
  },
  overPdfText: {
    fontSize: 17,
    margin: 10,
    fontStyle: 'italic'
  }
});
