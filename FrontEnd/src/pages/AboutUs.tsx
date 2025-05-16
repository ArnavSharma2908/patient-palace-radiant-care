
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hospital Introduction */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-medical-700">Radiant Care Hospital</h2>
            <p className="text-gray-600 leading-relaxed">
              Established in 2010, Radiant Care Hospital has been providing exceptional healthcare services
              to the Mysuru region. With state-of-the-art facilities and a team of experienced medical
              professionals, we strive to deliver the highest quality of care to our patients.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our hospital is equipped with modern diagnostic equipment, advanced surgical facilities,
              and comfortable patient rooms. We are committed to embracing the latest medical technologies
              and practices to ensure the best possible outcomes for our patients.
            </p>
          </div>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625" 
                alt="Radiant Care Hospital" 
                className="w-full h-full object-cover"
              />
            </CardContent>
          </Card>
        </section>

        {/* Mission */}
        <section className="bg-medical-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-medical-700 mb-6">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To provide compassionate, high-quality healthcare services that improve the health and
            well-being of our patients and the communities we serve. We strive to be the healthcare
            provider of choice by delivering personalized care with dignity and respect.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to excellence in patient care, medical research, and education. Our goal
            is to create a healing environment where advanced medicine and technology are balanced with
            empathy and human connection.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-2xl font-bold text-medical-700 mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Team Member 1 */}
            <Card>
              <CardContent className="p-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                  alt="Dr. Aryaman" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Aryaman</h3>
                <p className="text-gray-600">Chief Medical Officer</p>
              </CardContent>
            </Card>

            {/* Team Member 2 */}
            <Card>
              <CardContent className="p-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1566753323558-f4e0952af115" 
                  alt="Dr. Arnav" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Arnav</h3>
                <p className="text-gray-600">Head of Surgery</p>
              </CardContent>
            </Card>

            {/* Team Member 3 */}
            <Card>
              <CardContent className="p-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956" 
                  alt="Dr. Bhawana" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Bhawana</h3>
                <p className="text-gray-600">Head of Pediatrics</p>
              </CardContent>
            </Card>

            {/* Team Member 4 */}
            <Card>
              <CardContent className="p-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
                  alt="Dr. Ashita" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Ashita</h3>
                <p className="text-gray-600">Chief Neurologist</p>
              </CardContent>
            </Card>

            {/* Team Member 5 */}
            <Card>
              <CardContent className="p-4 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1607746882042-944635dfe10e" 
                  alt="Dr. Chandu Bhavana" 
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="font-bold text-lg">Dr. Chandu Bhavana</h3>
                <p className="text-gray-600">Head of Cardiology</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-3 text-medical-700">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from patient care to administrative 
                processes. Our commitment to continuous improvement drives us to constantly evolve our practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-3 text-medical-700">Compassion</h3>
              <p className="text-gray-600">
                We believe in treating each patient with empathy, dignity and respect. Our healthcare approach is 
                centered around understanding the unique needs of every individual who comes through our doors.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-3 text-medical-700">Innovation</h3>
              <p className="text-gray-600">
                We embrace innovation and leverage the latest medical technologies to provide cutting-edge healthcare 
                solutions. Our research initiatives aim to advance medical knowledge and improve patient outcomes.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </MainLayout>
  );
};

export default AboutUs;
