import React from 'react';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC';

function InstantConsultation() {
  return (
    <div>
      {/* This renders the search UI */}
      <FindDoctorSearchIC
        speciality={[
          'Dentist',
          'Gynecologist/obstetrician',
          'General Physician',
          'Dermatologist',
          'Ear-nose-throat (ent) Specialist',
          'Homeopath',
          'Ayurveda'
        ]}
      />

      {/* below you can render your doctor list / cards */}
      {/* <DoctorCardIC … /> */}
    </div>
  );
}

export default InstantConsultation;