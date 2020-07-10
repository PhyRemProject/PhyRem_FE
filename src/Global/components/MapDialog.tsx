import React, { useState, useEffect, useMemo, Component } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

function MapContainer(props: any) {

    return (

        <Map
            google={props.google}
            style={{
                height: "50vh",
                width: "30vw"
            }}
        >

        </Map>
    );
}


const GMaps = GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(MapContainer)


function MapDialog(props: any) {

    return (
        <Dialog
            open={props.showMap}
            onClose={() => { props.setShowMap(false) }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">{"Localização da Consulta"}</DialogTitle>
            <DialogContent style={{
                height: "90vh",
                width: "30vw"
            }}
            >
                <div className={"map-container"}>
                    <GMaps className={"map-cont"}></GMaps>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { props.setShowMap(false) }} color="primary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MapDialog;