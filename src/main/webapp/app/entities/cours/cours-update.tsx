import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategorie } from 'app/shared/model/categorie.model';
import { getEntities as getCategories } from 'app/entities/categorie/categorie.reducer';
import { ICatalogue } from 'app/shared/model/catalogue.model';
import { getEntities as getCatalogues } from 'app/entities/catalogue/catalogue.reducer';
import { ICours } from 'app/shared/model/cours.model';
import { getEntity, updateEntity, createEntity, reset } from './cours.reducer';

export const CoursUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const categories = useAppSelector(state => state.categorie.entities);
  const catalogues = useAppSelector(state => state.catalogue.entities);
  const coursEntity = useAppSelector(state => state.cours.entity);
  const loading = useAppSelector(state => state.cours.loading);
  const updating = useAppSelector(state => state.cours.updating);
  const updateSuccess = useAppSelector(state => state.cours.updateSuccess);

  const handleClose = () => {
    navigate('/cours');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getCategories({}));
    dispatch(getCatalogues({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...coursEntity,
      ...values,
      categories: mapIdList(values.categories),
      catalogue: catalogues.find(it => it.id.toString() === values.catalogue.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...coursEntity,
          categories: coursEntity?.categories?.map(e => e.id.toString()),
          catalogue: coursEntity?.catalogue?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="marissamayerApp.cours.home.createOrEditLabel" data-cy="CoursCreateUpdateHeading">
            <Translate contentKey="marissamayerApp.cours.home.createOrEditLabel">Create or edit a Cours</Translate>
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
                  id="cours-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('marissamayerApp.cours.nom')}
                id="cours-nom"
                name="nom"
                data-cy="nom"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('marissamayerApp.cours.description')}
                id="cours-description"
                name="description"
                data-cy="description"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField label={translate('marissamayerApp.cours.duree')} id="cours-duree" name="duree" data-cy="duree" type="text" />
              <ValidatedField
                label={translate('marissamayerApp.cours.prerequis')}
                id="cours-prerequis"
                name="prerequis"
                data-cy="prerequis"
                type="text"
              />
              <ValidatedField label={translate('marissamayerApp.cours.prix')} id="cours-prix" name="prix" data-cy="prix" type="text" />
              <ValidatedField
                label={translate('marissamayerApp.cours.categories')}
                id="cours-categories"
                data-cy="categories"
                type="select"
                multiple
                name="categories"
              >
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="cours-catalogue"
                name="catalogue"
                data-cy="catalogue"
                label={translate('marissamayerApp.cours.catalogue')}
                type="select"
                required
              >
                <option value="" key="0" />
                {catalogues
                  ? catalogues.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/cours" replace color="info">
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

export default CoursUpdate;
