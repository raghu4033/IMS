import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ApiService from '../../../../Utils/ApiService';
import userLogo from '../../../Images/logo.png'; // Import the logo
import { Drawer } from '../../Common/Drawer';
import { Table } from '../../Common/Table';
import '../styles.css';
import Loader from '../../Common/Loader';

export const StudentGenerateCertificate = () => {
  const [drawer, setDrawer] = useState({ open: false, cert: null });
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = ({ handleViewCertificate }) => [
    {
      label: 'Student Name',
      key: 'student',
      renderValue: (value) => {
        return [value?.firstName, value?.lastName].filter(Boolean).join(' ');
      },
    },
    {
      label: 'Certificate Date',
      key: 'date',
      renderValue: (value) => {
        return value && moment(value).isValid()
          ? moment(value).format('DD MMMM YYYY')
          : 'N/A';
      },
    },
    {
      label: 'Grade',
      key: 'certificateGrade',
      renderValue: (value) => {
        return value;
      },
    },
    {
      label: 'Generated By',
      key: 'generatedBy',
      renderValue: (value) => {
        return [value?.firstName, value?.lastName].filter(Boolean).join(' ');
      },
    },
    {
      label: 'View',
      key: '_id',
      renderValue: (_, row) => {
        return <button onClick={() => handleViewCertificate(row)}>View</button>;
      },
    },
  ];

  const getCertificates = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.get(
        `${ApiService.ApiURLs.getCertificates}`
      );
      if (resp.status === 200 && resp.data?.data) {
        console.log(resp.data.data);
        setCertificates(resp.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCertificates();
  }, []);

  const handleViewCertificate = (certificate) => {
    setDrawer({ cert: certificate, open: true });
  };

  function printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'px', 'a4');

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 15, 15, width - 30, height - 30);
      // pdf.output('dataurlnewwindow');
      pdf.save(`${drawer.cert?._id || 'certificate'}.pdf`);
    });
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <Table
        rows={certificates}
        columns={columns({ handleViewCertificate })}
        title={'Certificates'}
      />
      {drawer.open && drawer.cert ? (
        <div className='student-certificate'>
          <Drawer
            title={'Certificate'}
            isOpen={drawer.open}
            onClose={() => setDrawer({ cert: null, open: false })}
            footer={
              <>
                <button onClick={printDocument}>Download</button>
              </>
            }
          >
            <div className="student-certificate" id="divToPrint">
              <div className="certificate-container">
                <img
                  src={userLogo}
                  alt="Institute Logo"
                  className="certificate-logo"
                />
                <h1 className="certificate-title">
                  Certificate of Achievement
                </h1>
                <p className="certificate-text">This is to certify that</p>
                <h2 className="student-name">
                  {[
                    drawer?.cert?.student?.firstName,
                    drawer?.cert?.student?.lastName,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                </h2>
                <p className="certificate-text">
                  has successfully completed the
                </p>
                <h3 className="course-name">
                  {drawer?.cert?.course?.name || 'N/A'}
                </h3>
                <p className="certificate-text">with excellent grades.</p>
                <p className="certificate-date">
                  Date:{' '}
                  {drawer?.cert?.date && moment(drawer?.cert?.date).isValid()
                    ? moment(drawer?.cert?.date).format('DD MMMM YYYY')
                    : 'N/A'}
                </p>
                <div className="signature-section">
                  <div className="signature">
                    <p>_______________________</p>
                    <p className="signature-title">Institute Director</p>
                    <p className="signature-name">Harshadkumar</p>
                  </div>
                  <div className="signature">
                    <p>_______________________</p>
                    <p className="signature-title">Course Instructor</p>
                    <p className="signature-name">Irene Kwon</p>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
