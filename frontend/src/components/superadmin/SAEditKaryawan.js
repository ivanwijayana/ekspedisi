import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SAEditKaryawan(){
    const [nama, setNama] = useState('');
    const [lokasi, setLokasi] = useState('');
    const [idkaryawan, setIdKaryawan] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
 
    useEffect(() => {
        try{
            axios.get(`http://localhost:3010/karyawan/${id}`).then((res) => {
            setIdKaryawan(res.data.id_karyawan);
            setNama(res.data.nama_karyawan);
            setLokasi(res.data.cabang_karyawan);
        });
        } catch (error){
            alert(error)
        }
    }, [id]);

    const data = {
        id_karyawan: idkaryawan,
        nama_karyawan: nama,
        cabang_karyawan: lokasi
    };

    function UpdateKaryawan(e) {
        e.preventDefault();
        try{axios.put(`http://localhost:3010/karyawan/${id}`, data).then(navigate("/karyawan"));}
        catch (error){
            alert(error)
        }
    }

    return(
        <div className="col-lg-6">
                    <form className="form-horizontal" onSubmit={UpdateKaryawan}>
                    <div className="card">
                        <div className="card-header"><strong>Form Karyawan</strong></div>
                        <div className="card-body card-block">
                            <div className="form-group">
                                <label for="company" className=" form-control-label">
                                    ID Karyawan
                                </label>
                            <input type="text" id="id_cabang" name="id_cabang" placeholder="Enter Cabang ID" className="form-control" onChange={(e) => setIdKaryawan(e.target.value)} value={idkaryawan}/>                                
                            
                            <label for="vat" className=" form-control-label">
                                Nama karyawan
                            </label>
                            <input type="text" id="nama_cabang" name="nama_cabang" placeholder="Enter Cabang Name" className="form-control" onChange={(e) => setNama(e.target.value)} value={nama}/>
                            
                            <label for="street" className=" form-control-label">
                                Lokasi Karyawan
                            </label>
                            <input type="text" id="lokasi" name="lokasi" placeholder="Enter Cabang Location" className="form-control" onChange={(e) => setLokasi(e.target.value)} value={lokasi}/>
                            </div>
                        </div>
                        <div className="but">
                            <button onClick={() => {window.location.href="/karyawan"}} type="submit" className="btn btn-primary">Simpan</button>
                        </div>
                    </div>
                </form>
            </div>
    )
}

export default SAEditKaryawan;
