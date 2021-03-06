import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { GenericButton } from './GenericButton';

type TModalProps = {
    modalText: string;
    buttonText: string;
    onModalClose?: () => void;
    onButtonPress?: () => void;
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const InfoModal = ({
    modalText,
    buttonText,
    onButtonPress,
    onModalClose,
    modalVisible,
    setModalVisible,
}: TModalProps) => {
    const closeModal = () => setModalVisible(false);

    return (
        <View style={styles.centeredView}>
            <View style={{ flex: 1 }}>
                <Modal
                    isVisible={modalVisible}
                    onBackButtonPress={closeModal}
                    onBackdropPress={closeModal}
                    onModalHide={onModalClose}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText}</Text>

                        <GenericButton
                            text={buttonText}
                            type="primary"
                            customStyles={{ width: 'auto' }}
                            onPress={() => {
                                closeModal();
                                onButtonPress();
                            }}
                        />
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default InfoModal;
