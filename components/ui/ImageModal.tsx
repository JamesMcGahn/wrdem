import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { saveAs } from 'file-saver';
import Modal from 'react-bootstrap/Modal';
import Image, { StaticImageData } from "next/legacy/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/ImageModal.module.css';

interface ImgInterface {
  img: StaticImageData;
  alt: string;
  priority: boolean;
}

interface ModalsProps {
  title?: string;
  buttonText?: string;
  img: ImgInterface;
}

function ImageModal({ img, buttonText, title }: ModalsProps) {
  const [modalShow, setModalShow] = useState(false);

  const imageCont = (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image src={img.img} alt={img.alt} objectFit="contain" placeholder="blur" priority={img.priority} />
    </div>
  );

  const handleSave = (imgLink: StaticImageData, imgName: string): void => {
    saveAs(imgLink.src, imgName);
  };

  return (
    <>
      {buttonText || (
        <div onClick={() => setModalShow(true)} onKeyDown={() => setModalShow(false)} role="button" tabIndex={0}>
          {imageCont}
        </div>
      )}
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <div className={styles.dlSvg}>
            <FontAwesomeIcon icon={faCloudArrowDown} size="xl" onClick={() => handleSave(img.img, img.alt)} />
          </div>
          {title && <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>}
        </Modal.Header>
        <Modal.Body>{imageCont}</Modal.Body>
        <Modal.Footer>
          <Button className={styles.button} onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImageModal;
