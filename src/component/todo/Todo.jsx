import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, getDocs, doc, deleteDoc, runTransaction, orderBy, query } from 'firebase/firestore';
import EditTodo from './EditTodo';
import { db } from '../../firebase';
import $ from 'jquery'; // Import the jQuery library
import 'bootstrap/dist/js/bootstrap'; // Import the Bootstrap JavaScript

const Todo = () => {
  const [createTodo, setCreateTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const collectionRef = collection(db, 'todo');

  useEffect(() => {
    const getTodo = async () => {
      try {
        const q = query(collectionRef, orderBy('timestamp'));
        const snapshot = await getDocs(q);
        const todoData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setTodos(todoData);
      } catch (err) {
        console.log(err);
      }
    };
    getTodo();
  }, []);

  const submitTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        timestamp: serverTimestamp(),
      });
      setCreateTodo('');
      $('#addModal').modal('hide'); // Close the modal after adding the todo
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this Task!')) {
        const documentRef = doc(db, 'todo', id);
        await deleteDoc(documentRef);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkHandler = async (event, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isChecked: !todo.isChecked };
      }
      return todo;
    });

    setTodos(updatedTodos);

    try {
      const docRef = doc(db, 'todo', id);
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(docRef);
        if (!todoDoc.exists()) {
          throw new Error('Document does not exist!');
        }
        const newValue = !todoDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
      console.log('Transaction successfully committed!');
    } catch (error) {
      console.log('Transaction failed: ', error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="card card-white">
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-info"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  Add Todo
                </button>

                {todos.map(({ todo, id, isChecked, timestamp }) => (
                  <div className="todo-list" key={id}>
                    <div className="todo-item">
                      <hr />
                      <span className={isChecked ? 'done' : ''}>
                        <div className="checker">
                          <span className="">
                            <input
                              type="checkbox"
                              defaultChecked={isChecked}
                              name={id}
                              onChange={(event) => checkHandler(event, id)}
                            />
                          </span>
                        </div>
                        &nbsp;{todo}
                        <br />
                        <i>{new Date(timestamp.seconds * 1000).toLocaleString()}</i>
                      </span>
                      <span className="float-end mx-3">
                        <EditTodo todo={todo} id={id} />
                      </span>
                      <button
                        type="button"
                        className="btn btn-danger float-end"
                        onClick={() => deleteTodo(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form className="d-flex" onSubmit={submitTodo}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  Add Todo
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a Todo"
                  value={createTodo}
                  onChange={(e) => setCreateTodo(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Create Todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Todo;
