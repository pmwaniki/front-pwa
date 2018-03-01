import * as actionTypes from "./actionTypes";
import config from "../../config";
import idb from 'idb';



const dbPromise=idb.open('image-store',1,(db)=>{
    if(!db.objectStoreNames.contains('images')){
        db.createObjectStore('images',{keyPath:'file_path'});
    }
    if(!db.objectStoreNames.contains('synced-images')){
        db.createObjectStore('synced-images',{keyPath:'file_path'});
    }
});

const writeData=(st,data)=>{
    return dbPromise
        .then(function(db){
            let tx=db.transaction(st,'readwrite');
            let store=tx.objectStore(st);
            store.put(data);
            return tx.complete;
        })
};

const readAllData=(st)=>{
    return dbPromise
        .then(db=>{
            let tx=db.transaction(st);
            return tx.objectStore(st).getAll();
        });
};

const getToken=()=>{
    let token=localStorage.getItem("token");
    return {Authorization: "Token " + token}
};


const addImage=(image)=>{
    return {
        type:actionTypes.SAVE_IMAGE,
        image:image
    }
};

const syncImages=(image)=>{
    return {
        type:actionTypes.SYNC_IMAGES,
        image:image
    }
};
const setSynced=(images)=>{
    return {
        type:actionTypes.LOAD_SYNCED_IMAGES,
        images:images,
    }
};

export const loadSynced=()=>{
    return dispatch=>{
        readAllData('synced-images')
            .then(res=>{
                dispatch(setSynced(res));
            });

    }
};

export const saveImage = (image)=>{
    return dispatch=>{
        writeData('images',image);
        dispatch(addImage(image));
        upload(image)
            .then(res=>{
                if (res.ok){
                    return res.json();
                } else {
                    throw Error(res.statusText);
                }

            })
            .then(res2=>{
                //let res2=res.clone();
                //let res2=res.json();
                let sync_info={file_path:image.file_path,date:new Date().toISOString()};
                console.log("Server said",res2);
                writeData('synced-images',sync_info);
                dispatch(syncImages(sync_info));



            })
            .catch(err=>console.log("Upload error:",err));
    }

};

const upload=(image)=>{
    //
    let url=config.backendURL + "/api/new/";
    let formData=new FormData();
    formData.append('file_path',image.blob,image.file_path);
    formData.append('record_id',image.record_id);
    formData.append('ipno',image.ipno);
    formData.append('hosp_id',image.hosp_id);

    return fetch(url,{
        method:"POST",
        body:formData,
        headers:getToken(),
        mode:'cors'

    });


};

const setImages=(images)=>{
    return {
        type:actionTypes.LOAD_IMAGES,
        images:images
    }
};
export const loadImages=()=>{
    return dispatch=>{
        readAllData('images')
            .then(res=>{
                console.log("loaded images:",res);
                dispatch(setImages(res));
                console.log("stored images",res);
            });
    }
};


const setHospitals=(hospitals)=>{
    return {
        type:actionTypes.SET_HOSPITALS,
        hospitals:hospitals
    }
};
const setHospital=(hospital)=>{

    return {
        type:actionTypes.SET_HOSPITAL,
        hospital:hospital
    }
};

export const changeHospital=(hosp)=>{
    return dispatch=>{
        localStorage.setItem("hosp",hosp);
        dispatch(setHospital(hosp));
    }
};

export const loadHospital=()=>{
    return dispatch=>{
        const hosp=localStorage.getItem("hosp");
        if(hosp) dispatch(setHospital(hosp));
    }
};



export const getHospitals=()=>{
    return dispatch=>{
        fetch(config.backendURL + "/api/hospitals/",{
            method:"GET",
            headers:getToken()
        })
            .then(res=>{
                if(res.ok){
                    return res.json();
                }
                throw Error(res.statusText);
            })
            .then(res=>{
                dispatch(setHospitals(res));
            })
    }
};



