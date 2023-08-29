import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PatientPage = (data) => {
  return (
    <DefaultLayout>
      <div>
        <h1>Thông tin chi tiết</h1>
        <div className="card">
            <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="id"></Column>
                <Column field="time" header="Thời gian"></Column>
                <Column field="fullName" header="Bệnh nhân"></Column>
                <Column field="note" header="Chuẩn đoán"></Column>
            </DataTable>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PatientPage;
