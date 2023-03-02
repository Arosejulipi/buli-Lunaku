//imports
import {Button, FlatList, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import React, { useEffect, useState } from "react";

export default function App() {

  const [tareas, setTareas] = useState([
    {
      id: 1,
      name: "Hacer la cama",
      estado: false
    },
    {
      id: 2,
      name: "Meditar",                      //tareas predeterminadas 
      estado: true
    },
    {
      id: 3,
      name: "Estudiar",
      estado: false
    },
    
  ]);
               //para visibilizar el modal, seleccionar las tareas y el nombre de las mismas 
  const [addModal, setAddModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [tareaName, setTareaName] = useState("");
  const onChangeTareaName = (text) => {
    setTareaName(text);
  };

  // funciones para el funcionamiento de la app 
  const openNewTareaModal = () => {                    //ventana que se abre al agregar tareas 
    setAddModal(true);
  }

  const addTarea = () => {
    setTareas((oldArray) => [...oldArray, { id: Date.now(), name: tareaName, estado: false }]);     //agregar tareas 
    setTareaName("");
    setAddModal(!addModal);
  };

  const closeAddTarea = () => {
    setAddModal(!addModal);                    //cierra modal al agregarse la tareia 
    setTareaName("");
  }
  
 
  const openTarea = (item) => {           
    setSelectedItem(item);                  
    setModalVisible(true);
  };

  const estadoTarea = (id) => {
    setModalVisible(!modalVisible);
    tareas.find(item => item.id === id).estado = true;
    setSelectedItem({});
  }

  const onDeleteTarea = (id) => {
    setModalVisible(!modalVisible);
    setTareas((oldArray) => oldArray.filter((item) => item.id !== id));
    setSelectedItem({});
  };

  const onCancelModal = () => {
    setModalVisible(!modalVisible);
    setSelectedItem({});
  };


  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Buli Lunaku ☾</Text>
      <View style={styles.addItemInputContainer}>
        <Button title="Agregar una nueva tarea ✚" onPress={openNewTareaModal} />
      </View>
      <FlatList
        style={styles.flatList}
        data={tareas}
        renderItem={(itemData) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => {
              openTarea(itemData.item);
            }}
          >
            <Text style={styles.itemName}>{itemData.item.name}</Text>
            <Text style={itemData.item.estado ? styles.itemEstado : styles.itemEstadoo}>{itemData.item.estado ? "Hecho" : "Sin hacer"}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalMainView}>
          <View style={styles.modalView}>
            <View style={styles.buttonClose}>
              <Pressable
                onPress={onCancelModal}
              >
                <Text style={[styles.button, styles.close]}>⌧</Text>
              </Pressable>
            </View>
            <Text style={styles.modalTitle}>{selectedItem.name}</Text>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>
                <Text>Estado: </Text>
                <Text style={styles.modalBoldText}>{selectedItem.estado ? "Hecho" : "Sin hacer"}</Text>
              </Text>
            </View>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.button, styles.buttonCancel, selectedItem.estado && styles.disabledButton]}
                onPress={() => {
                  estadoTarea(selectedItem.id);
                }}
                disabled={selectedItem.estado}
              >
                <Text style={[styles.textStyle, selectedItem.estado && styles.disabledButton]}>Hecha</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  onDeleteTarea(selectedItem.id);
                }}
              >
                <Text style={styles.textStyle}>⌧</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonEdit]}
              >
                <Text style={styles.textStyle}>Editar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={addModal}>
        <View style={styles.modalMainView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}> tarea</Text>
            <View style={styles.addItemInputContainerModal}>
              <TextInput
                placeholder="Tarea"
                style={styles.input}
                onChangeText={onChangeTareaName}
                value={tareaName}
              />
            </View>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => closeAddTarea()}
              >
                <Text style={styles.textStyle}>⌧</Text>
              </Pressable>
            
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => {
                  addTarea();
                }}
              >
                <Text style={styles.textStyle}>✚</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 25,
    padding: 3,
    flex: 1,
  backgroundColor: "#CEEBEF"
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    color: "#CBD99B",
    width: '90%',
  },
  flatList: {
    borderTopColor: "#F9E2D2",
    borderTopWidth: 5,
  },
  addItemInputContainer: {
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  addItemInputContainerModal: {
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: 200,
    borderBottomColor: "#BFBA87",
    borderBottomWidth: 5,
    marginTop: 10
  },
  itemContainer: {
    padding: 10,
    marginTop: 1,
    borderBottomColor: "#EAAE89",
    borderBottomWidth: 1
  },
 
  itemName: {
    fontSize: 32,
    fontWeight: "bold",
    color:"#EAAE89"
  },
  itemEstado: {
    fontSize: 20,
    color: "#CEA3E2"
  },
  itemEstadoo: {
    fontSize: 20,
    color: "#A8C08D"
  },
  modalMainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#CEA3E2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  color:"#BFBA87"
  },
  modalBody: {
    alignItems: "flex-start",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalBoldText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
  },
  buttonCancel: {
    backgroundColor: "#0BC908",
  },
  buttonDelete: {
    backgroundColor: "#EA1111",
  },
  buttonEdit: {
    backgroundColor: "#7F8BFC",
  },
  buttonClose: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  close: {
    backgroundColor: "#EA1111",
  },
});
