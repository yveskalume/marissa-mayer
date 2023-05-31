package com.esisalama.marissamayer.service.dto;

import com.esisalama.marissamayer.domain.enumeration.CreneauStatuts;
import com.esisalama.marissamayer.domain.enumeration.Jour;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.esisalama.marissamayer.domain.Creneau} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CreneauDTO implements Serializable {

    private Long id;

    private Jour jour;

    private String heureDebut;

    private String heureFin;

    private CreneauStatuts statuts;

    private CoursDTO cours;

    private UtilisateurDTO utilisateur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Jour getJour() {
        return jour;
    }

    public void setJour(Jour jour) {
        this.jour = jour;
    }

    public String getHeureDebut() {
        return heureDebut;
    }

    public void setHeureDebut(String heureDebut) {
        this.heureDebut = heureDebut;
    }

    public String getHeureFin() {
        return heureFin;
    }

    public void setHeureFin(String heureFin) {
        this.heureFin = heureFin;
    }

    public CreneauStatuts getStatuts() {
        return statuts;
    }

    public void setStatuts(CreneauStatuts statuts) {
        this.statuts = statuts;
    }

    public CoursDTO getCours() {
        return cours;
    }

    public void setCours(CoursDTO cours) {
        this.cours = cours;
    }

    public UtilisateurDTO getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(UtilisateurDTO utilisateur) {
        this.utilisateur = utilisateur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CreneauDTO)) {
            return false;
        }

        CreneauDTO creneauDTO = (CreneauDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, creneauDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CreneauDTO{" +
            "id=" + getId() +
            ", jour='" + getJour() + "'" +
            ", heureDebut='" + getHeureDebut() + "'" +
            ", heureFin='" + getHeureFin() + "'" +
            ", statuts='" + getStatuts() + "'" +
            ", cours=" + getCours() +
            ", utilisateur=" + getUtilisateur() +
            "}";
    }
}
