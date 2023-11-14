import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '55%',
  right: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  outline: 'none',
  p: 4
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -220px)',
  overFlowY: 'scroll',
  outline: 'none',
  width: '70%',
  height: '100%'
};

const AttachImageModal = (props) => {
  const { openImage, handleCloseImage, image } = props;
  var ext = image.substring(image.lastIndexOf('.') + 1);

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (ext == 'pdf') {
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openImage}
          onClose={handleCloseImage}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
          sx={{
            zIndex: 0,
            overflowY: 'scroll',
            paddingBottom: '100px'
          }}
        >
          <Fade in={openImage}>
            <Box sx={style1} className="position-relative">
              <Box>
                {/* <Document
                  className="mt-5 h-100 w-100"
                  // file={{
                  //   url: 'https://nannies-resources.s3.eu-west-1.amazonaws.com/job-attachment-5376b2c8-293a-451c-901e-000b3d32b531.pdf'
                  // }}
                  file={{
                    url: 'https://nannies-resources.s3.eu-west-1.amazonaws.com/job-attachment-5376b2c8-293a-451c-901e-000b3d32b531.pdf'
                  }}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(err) => console.log('====', err)}
                >
                  <Page pageNumber={1} />
                </Document> */}
                <iframe src={image} style={{ height: '100%', width: '100%' }} />
                <CloseIcon
                  style={{ marginTop: '-30px' }}
                  className="position-absolute text-light cursor-pointer"
                  onClick={handleCloseImage}
                />
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  } else {
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openImage}
        onClose={handleCloseImage}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={openImage}>
          <Box sx={style}>
            <Box className="position-relative">
              <img
                src={image}
                className="mt-5"
                style={{
                  // height: '100%',
                  width: '90%',
                  borderRadius: '5px',
                  objectFit: 'fill'
                  // backgroundSize: 'cover'
                }}
              />

              <CloseIcon
                className="position-absolute mt-3 text-light cursor-pointer"
                onClick={handleCloseImage}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  }
};

export default AttachImageModal;
