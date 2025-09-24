import React, {useState} from "react";
import {Modal, Button, Form, Dropdown} from "react-bootstrap";
import {createDeviceSuccess} from "../../store/deviceSlice";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store";

const CreateDevice = ({show, onHide}: {show: boolean; onHide: () => void}) => {

    const dispatch = useDispatch<AppDispatch>()
    const {types, brands} = useSelector((state: RootState) => state.device)

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [rating, setRating] = useState(0)
    const [file, setFile] = useState<File | null>(null)
    const [selectedBrand, setSelectedBrand] = useState<{id: number; name: string} | null>(null)
    const [selectedType, setSelectedType] = useState<{id: number; name: string} | null>(null)

     const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    const addDevice = async() => {
        try{
            const formData = new FormData()
            formData.append("name", name);
            formData.append("price", `${price}`);
            formData.append("rating", `${rating}`)
            if(file) {
                formData.append("img", file)
            };
            if(selectedBrand) {
                formData.append("brandId", `${selectedBrand.id}`)
            };
            if(selectedType) {
                formData.append("typeId", `${selectedType.id}`)
            }

            const response = await fetch("http://localhost:5002/api/device", {
                method: "POST",
                body: formData
            })
            if(!response.ok){
                const errorData = await response.json()
                    throw new Error (errorData.message || "Error with creating device")
                }
            const newDevice = await response.json()
                dispatch(createDeviceSuccess(newDevice))
                onHide()
        } catch(e: any) {
            alert(e.message)
        }
    };
        
    return (
        <Modal show={show} onHide={onHide} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add new device</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Dropdown className="mt-2">
                <Dropdown.Toggle>{selectedType?.name || "Choose type"}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {types.map((type) => (
                    <Dropdown.Item key={type.id} onClick={() => setSelectedType(type)}>
                      {type.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
    
              <Dropdown className="mt-2">
                <Dropdown.Toggle>{selectedBrand?.name || "Choose brand"}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {brands.map((brand) => (
                    <Dropdown.Item key={brand.id} onClick={() => setSelectedBrand(brand)}>
                      {brand.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control
                className="mt-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter device name"
              />
              <Form.Control
                className="mt-3"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter device price"
                type="number"
              />
              <Form.Control
              className="mt-3"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              placeholder="Enter device rating"
              />
              <Form.Control className="mt-3" type="file" onChange={selectFile} />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={onHide}>Close</Button>
            <Button variant="outline-success" onClick={addDevice}>Add</Button>
          </Modal.Footer>
        </Modal>
      );
    
}; 
    
export default CreateDevice;