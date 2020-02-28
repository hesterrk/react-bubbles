import React, { useState } from "react";
import { axiosWithAuth } from './utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';



const initialColor = {
  color: "",
  code: { hex: "" }
};

//colorlist is recieving props from: Bubblepage
//these are: props.colors and props.updateColors in its params
//props.colors: colors recieved and dispayed, so to update color will need to use props.updateColors in PUT request

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const history = useHistory();


  //stretch add color 
  const [colorAdd, setColorAdd] = useState(initialColor)

  const onSubmit = e => {
    e.preventDefault();
    axiosWithAuth().post('/api/colors', colorAdd)
    .then(res => {
      console.log(res);
      history.go(0)
    })
    .catch(err => console.log(err))
  };



  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color: 
    // think about where will you get the id from...
    // where is is saved right now?
    
    axiosWithAuth().put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
        console.log(res)
        updateColors(colors, res.data)
        history.go(0)

    })
    .catch(err => console.log(err));

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete(`/api/colors/${color.id}`)
    .then(res => {
      console.log(res, 'deleted')
      history.push('/bubblepage')
      const newlyArray = colors.filter(item => item.id !== res.data)
      updateColors(newlyArray)
  
  })
  .catch(err => console.log(err));
    
  };

  return (
    <div className="colors-wrap">
      <h4>Add New Color Here: </h4>
      <form onSubmit={onSubmit}>
        <input
        type="text"
        name="color"
        placeholder="Enter color"
        value={colorAdd.color}
        onChange={ e => setColorAdd({...colorAdd, color: e.target.value})
      }
        />
        <input
        type="text"
        name="code"
        placeholder="Enter color hex code"
        value={colorAdd.code.hex}
        onChange={e => setColorAdd({...colorAdd, code: { hex: e.target.value }})
        }
        />
        <button> Add New Color </button>

      </form>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* <h4>Add New Color Here: </h4>
      <form onSubmit={onSubmit}>
        <input
        type="text"
        name="color"
        placeholder="Enter color"
        value={colorAdd.color}
        onChange={handleChange}
        />
        <input
        type="text"
        name="code"
        placeholder="Enter color hex code"
        value={colorAdd.code}
        onChange={handleChange}
        />
        <button> Add New Color </button>

      </form> */}
    </div>
  );
};

export default ColorList;