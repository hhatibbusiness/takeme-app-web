import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./Backup.css";
import { useNavbarContext } from "../../context/navbar.context";
import backup from "../../assets/images/Backup.png";
import Export from "../../assets/images/Export.png";
import Import from "../../assets/images/Import.png";
import FetchAPI from "../../utilty/FetchAPI";
import WarningAlarm from '../../components/WarningAlarm/WarningAlarmPop';

export default function Backup({ setAdmin }) {
    const dispatch = useDispatch();
    const { changeSearchActive } = useNavbarContext();
    const [openWarning, setOpenWarning] = useState(false);
    const [warningType, setWarningType] = useState('');
    const [isloading, setIsloading] = useState(false);

    useEffect(() => {
        setAdmin(true);
        changeSearchActive(false);
        return () => {
            setAdmin(false);
            changeSearchActive(true);
        };
    }, []);
 
    
    const handleBackupAction = async (type) => {
        setIsloading(true);
        const BASE_URL = "http://191.96.1.25:8080/app_test/endpoints/backup/database";
        await FetchAPI(
            `${BASE_URL}/${type}`,
            { method: "GET" },
            dispatch,
            true
        );
        setIsloading(false);
        setOpenWarning(false);
    }

    return (
        <>
            <div className="Backup__container">
                <div className="Backup__image">
                    <img src={backup} alt="Backup" />
                </div>
                <div className="Backup__export_import">
                    <button className="export-import-button" onClick={() => {
                        setWarningType('export');
                        setOpenWarning(true);
                    }}>
                        <span>Export</span>
                        <img src={Export} alt="Export Icon" />
                    </button>
                    <button className="export-import-button" onClick={() => {
                        setWarningType('import');
                        setOpenWarning(true);
                    }}>
                        <span>Import</span>
                        <img src={Import} alt="Import Icon" />
                    </button> 
                </div>
            </div>
            {openWarning && (
                <WarningAlarm
                    CloseFun={()=> setOpenWarning(false)}
                    SaveFun={() => handleBackupAction(warningType)}
                    typeSrc={'warning'}
                    message={warningType === 'export' ? 
                        'هل انت متاكد من انك تريد انشاء نسخه احتياطيه جديده ؟' :
                        'هل انت متاكد من انك تريد استرداد النسخه الاحتياطيه ؟'
                    }
                    isloading={isloading}
                />
            )}
        </>
    );
}
