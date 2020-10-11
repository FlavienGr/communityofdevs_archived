import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CommonErrorMessage from './CommonErrorMessage';
import DevelopersListItems from './DevelopersListItems';

export default function DevelopersList({
  projectId,
  currentUser,
  setErrorsRequest,
  disabledButton,
  setDisabledButton
}) {
  const { register, handleSubmit, errors } = useForm();
  const [checkedInputAll, setCheckedInputAll] = useState(true);
  const [checkedInputValidate, setCheckedInputValidate] = useState(false);
  const [checkedInputInterested, setCheckedInputInterested] = useState(false);
  const [developersListSave, setDevelopersListSave] = useState([]);
  const [developersList, setDevelopersList] = useState([]);

  const handleChange = e => {
    switch (e.target.name) {
      case 'all':
        setCheckedInputAll(!checkedInputAll);
        setCheckedInputValidate(false);
        setCheckedInputInterested(false);

        break;
      case 'validate':
        setCheckedInputValidate(!checkedInputValidate);
        setCheckedInputAll(false);
        setCheckedInputInterested(false);
        break;
      case 'interested':
        setCheckedInputInterested(!checkedInputInterested);
        setCheckedInputValidate(false);
        setCheckedInputAll(false);
        break;
    }
  };
  const onSubmit = async dataFromInput => {
    setErrorsRequest(null);
    setDisabledButton(true);
    let inputResult;
    const array = Object.keys(dataFromInput);
    array.forEach(item => {
      if (dataFromInput[item]) {
        inputResult = item;
      }
    });

    const url = `http://localhost:5000/api/v1/devs/project/developers/${inputResult}/${projectId}`;

    if (inputResult) {
      if (developersList.length === 0) {
        try {
          const { data: devsList } = await axios.get(url, {
            withCredentials: true
          });
          if (devsList.success) {
            const responseDevsList = devsList.data.filter(item => {
              return (
                (item.devs_id == currentUser.data.id &&
                  item.status === inputResult) ||
                inputResult === 'all'
              );
            });
            if (responseDevsList.length > 0) {
              setDevelopersListSave(responseDevsList);
              setDevelopersList(responseDevsList);
            } else {
              setDevelopersList([]);
            }
            setDisabledButton(false);
          }
        } catch (error) {
          setDevelopersList([]);
          setErrorsRequest(<CommonErrorMessage />);
        }
      } else {
        const responseDevsList = developersListSave.filter(item => {
          return (
            item.devs_id == currentUser.data.id &&
            (item.status === inputResult || inputResult === 'all')
          );
        });
        if (responseDevsList.length > 0) {
          setDevelopersList(responseDevsList);
          setDisabledButton(false);
        } else {
          setDevelopersList([]);
          setDisabledButton(false);
        }
      }
    }
  };
  const devsListPart = (
    <div>
      <Col>
        <h4>List</h4>
      </Col>
      <Col className="mt-4">
        <ul>
          {developersList.map(item => {
            return (
              <DevelopersListItems
                key={item.devs_id}
                id={item.devs_id}
                name={item.name}
                projectId={projectId}
              />
            );
          })}
        </ul>
      </Col>
    </div>
  );
  const devsListPartEmpty =
    developersListSave.length > 0 ? (
      <div>
        <Col>
          <h4>No Found</h4>
        </Col>
      </div>
    ) : (
      undefined
    );
  const renderDevsList =
    developersList.length > 0 ? devsListPart : devsListPartEmpty;
  return (
    <Col className="mt-5">
      <hr />
      <Col>
        <h4>Developers</h4>
      </Col>
      <Col className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-check form-check-inline mr-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="all"
              name="all"
              onChange={handleChange}
              checked={checkedInputAll}
              ref={register()}
            />
            <label className="form-check-label" htmlFor="all">
              All
            </label>
          </div>
          <div className="form-check form-check-inline mr-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="validate"
              name="validate"
              onChange={handleChange}
              checked={checkedInputValidate}
              ref={register()}
            />
            <label className="form-check-label" htmlFor="validate">
              I&apos;m in!
            </label>
          </div>
          <div className="form-check form-check-inline mr-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="interested"
              name="interested"
              onChange={handleChange}
              checked={checkedInputInterested}
              ref={register()}
            />
            <label className="form-check-label" htmlFor="interested">
              Interested
            </label>
          </div>
          <Col className="pl-0 mt-4">
            <Button
              variant="dark"
              type="submit"
              className="btn btn-primary"
              disabled={disabledButton}>
              Search
            </Button>
          </Col>
        </form>
      </Col>
      <hr />
      {renderDevsList}
    </Col>
  );
}
