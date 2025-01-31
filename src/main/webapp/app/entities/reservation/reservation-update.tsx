import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { getEntities as getUtilisateurs } from 'app/entities/utilisateur/utilisateur.reducer';
import { ICours } from 'app/shared/model/cours.model';
import { getEntities as getCours } from 'app/entities/cours/cours.reducer';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationStatuts } from 'app/shared/model/enumerations/reservation-statuts.model';
import { getEntity, updateEntity, createEntity, reset } from './reservation.reducer';

export const ReservationUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const utilisateurs = useAppSelector(state => state.utilisateur.entities);
  const cours = useAppSelector(state => state.cours.entities);
  const reservationEntity = useAppSelector(state => state.reservation.entity);
  const loading = useAppSelector(state => state.reservation.loading);
  const updating = useAppSelector(state => state.reservation.updating);
  const updateSuccess = useAppSelector(state => state.reservation.updateSuccess);
  const reservationStatutsValues = Object.keys(ReservationStatuts);

  const handleClose = () => {
    navigate('/reservation');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUtilisateurs({}));
    dispatch(getCours({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...reservationEntity,
      ...values,
      user: utilisateurs.find(it => it.id.toString() === values.user.toString()),
      cours: cours.find(it => it.id.toString() === values.cours.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          statuts: 'REJETEE',
          ...reservationEntity,
          date: convertDateTimeFromServer(reservationEntity.date),
          user: reservationEntity?.user?.id,
          cours: reservationEntity?.cours?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="marissamayerApp.reservation.home.createOrEditLabel" data-cy="ReservationCreateUpdateHeading">
            <Translate contentKey="marissamayerApp.reservation.home.createOrEditLabel">Create or edit a Reservation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="reservation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('marissamayerApp.reservation.statuts')}
                id="reservation-statuts"
                name="statuts"
                data-cy="statuts"
                type="select"
              >
                {reservationStatutsValues.map(reservationStatuts => (
                  <option value={reservationStatuts} key={reservationStatuts}>
                    {translate('marissamayerApp.ReservationStatuts.' + reservationStatuts)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('marissamayerApp.reservation.date')}
                id="reservation-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                id="reservation-user"
                name="user"
                data-cy="user"
                label={translate('marissamayerApp.reservation.user')}
                type="select"
                required
              >
                <option value="" key="0" />
                {utilisateurs
                  ? utilisateurs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="reservation-cours"
                name="cours"
                data-cy="cours"
                label={translate('marissamayerApp.reservation.cours')}
                type="select"
                required
              >
                <option value="" key="0" />
                {cours
                  ? cours.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/reservation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ReservationUpdate;
