import 'package:flutter/material.dart';

void main() {
  runApp(const MedintalApp());
}

class MedintalApp extends StatelessWidget {
  const MedintalApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MedIntal',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: const Color(0xFFF8F9FB),
        fontFamily: 'Roboto',
        useMaterial3: true,
      ),
      home: const MainScreen(),
    );
  }
}

// --- الشاشة الرئيسية للتحكم في التنقل ---
class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const DashboardScreen(),
    const AlertsScreen(),
    const ChatbotScreen(), // New Chatbot Screen linked to AI Service
    const ProfileScreen(), // Updated to match PatientMedical Model
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 400),
        child: _screens[_selectedIndex],
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)],
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (index) => setState(() => _selectedIndex = index),
          type: BottomNavigationBarType.fixed,
          selectedItemColor: Colors.blueAccent,
          unselectedItemColor: Colors.grey.shade400,
          backgroundColor: Colors.white,
          elevation: 0,
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.dashboard_rounded), label: 'Dashboard'),
            BottomNavigationBarItem(icon: Icon(Icons.notifications_active_rounded), label: 'Alerts'),
            BottomNavigationBarItem(icon: Icon(Icons.smart_toy_rounded), label: 'AI Assistant'),
            BottomNavigationBarItem(icon: Icon(Icons.person_rounded), label: 'Profile'),
          ],
        ),
      ),
    );
  }
}

// --- شاشة لوحة التحكم (Dashboard) ---
class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('MedIntal', style: TextStyle(fontWeight: FontWeight.w900, letterSpacing: 1.2)),
        centerTitle: true,
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildStatusBanner(),
            const SizedBox(height: 30),
            const Text('Live Vitals', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 15),
            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: 2,
              crossAxisSpacing: 15,
              mainAxisSpacing: 15,
              childAspectRatio: 1.1,
              children: const [
                HealthCard(title: 'Heart Rate', value: '76', unit: 'bpm', icon: Icons.favorite, color: Colors.redAccent, isPulse: true),
                HealthCard(title: 'Temperature', value: '36.6', unit: '°C', icon: Icons.thermostat_rounded, color: Colors.orangeAccent),
                HealthCard(title: 'Stress Level', value: 'Low', unit: '', icon: Icons.psychology_rounded, color: Colors.purpleAccent),
                HealthCard(title: 'Avg. Glucose', value: '98', unit: 'mg/dL', icon: Icons.water_drop_rounded, color: Colors.blueAccent),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBanner() {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.green.shade400, Colors.green.shade700],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [BoxShadow(color: Colors.green.withOpacity(0.3), blurRadius: 15, offset: const Offset(0, 8))],
      ),
      child: Row(
        children: [
          const Icon(Icons.health_and_safety_rounded, color: Colors.white, size: 48),
          const SizedBox(width: 20),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text('Stable Condition', style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)),
                SizedBox(height: 4),
                Text('Based on your medical profile\nand live readings.', style: TextStyle(color: Colors.white70, fontSize: 14, height: 1.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// --- مكون البطاقة الصحية ---
class HealthCard extends StatelessWidget {
  final String title, value, unit;
  final IconData icon;
  final Color color;
  final bool isPulse;
  const HealthCard({super.key, required this.title, required this.value, required this.unit, required this.icon, required this.color, this.isPulse = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(24)),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: color, size: 32),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            textBaseline: TextBaseline.alphabetic,
            crossAxisAlignment: CrossAxisAlignment.baseline,
            children: [
              Text(value, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              if (unit.isNotEmpty) Text(' $unit', style: const TextStyle(fontSize: 12, color: Colors.grey)),
            ],
          ),
          Text(title, style: TextStyle(color: Colors.grey.shade500, fontSize: 13)),
        ],
      ),
    );
  }
}

// --- شاشة التنبيهات (Stub) ---
class AlertsScreen extends StatelessWidget {
  const AlertsScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Alerts Screen"));
  }
}

// --- شاشة الشات بوت (AI Assistant) ---
class ChatbotScreen extends StatelessWidget {
  const ChatbotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Medical Assistant'), centerTitle: true),
      body: Column(
        children: [
          Expanded(
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.auto_awesome, size: 60, color: Colors.blueAccent.withOpacity(0.5)),
                  const SizedBox(height: 20),
                  const Text("Ask me about your health...", style: TextStyle(color: Colors.grey)),
                ],
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: 'Type your question...',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(30), borderSide: BorderSide.none),
                      filled: true,
                      fillColor: Colors.grey.shade100,
                      contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                CircleAvatar(backgroundColor: Colors.blueAccent, child: IconButton(icon: const Icon(Icons.send, color: Colors.white), onPressed: () {})),
              ],
            ),
          )
        ],
      ),
    );
  }
}

/**
 * شاشة الملف الشخصي (Profile Screen)
 * Updated to match the Backend ERD:
 * - User Model: name, email
 * - PatientMedical Model: age, gender, weight, height, diseaseType, duration, symptoms, medications
 */
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('My Medical Profile'), centerTitle: true),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          children: [
            // --- User Basic Info (From User Model) ---
            const CircleAvatar(
              radius: 50,
              backgroundColor: Colors.blueAccent,
              child: Icon(Icons.person, size: 50, color: Colors.white),
            ),
            const SizedBox(height: 16),
            const Text('Mido Old (Example)', style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const Text('mido@example.com', style: TextStyle(color: Colors.grey, fontSize: 14)),
            
            const SizedBox(height: 30),
            
            // --- Vitals Section (From PatientMedical) ---
            _buildSectionHeader('Physical Vitals'),
            _buildInfoCard([
              _infoRow(Icons.cake, 'Age', '18 Years'),
              _infoRow(Icons.male, 'Gender', 'Male'), // or Female from enum
              _infoRow(Icons.monitor_weight, 'Weight', '78 kg'),
              _infoRow(Icons.height, 'Height', '175 cm'),
            ]),

            const SizedBox(height: 24),

            // --- Medical Condition (From PatientMedical) ---
            _buildSectionHeader('Medical Condition'),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.redAccent.withOpacity(0.05),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.redAccent.withOpacity(0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _infoRow(Icons.medical_services, 'Condition', 'Diabetes'), // diseaseType
                  const Divider(height: 20),
                  _infoRow(Icons.timer, 'Duration', '5 Years'), // durationInYears
                  const Divider(height: 20),
                  const Text('Symptoms:', style: TextStyle(color: Colors.grey, fontSize: 12)),
                  const SizedBox(height: 5),
                  Wrap(
                    spacing: 8,
                    children: ['Thirst', 'Fatigue', 'Blurry Vision'].map((s) => Chip(
                      label: Text(s, style: const TextStyle(fontSize: 12)),
                      backgroundColor: Colors.white,
                      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    )).toList(),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // --- Medications (From PatientMedical) ---
            _buildSectionHeader('Current Medications'),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
              child: Column(
                children: [
                  _medicationItem('Insulin', 'Daily'),
                  const Divider(),
                  _medicationItem('Metformin', 'After meals'),
                ],
              ),
            ),

            const SizedBox(height: 24),

            // --- Follow Up ---
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(color: Colors.blue.shade50, borderRadius: BorderRadius.circular(15)),
              child: Row(
                children: const [
                  Icon(Icons.calendar_today, color: Colors.blueAccent),
                  SizedBox(width: 15),
                  Text('Follow up with doctor required?', style: TextStyle(fontWeight: FontWeight.bold)),
                  Spacer(),
                  Chip(label: Text('Yes', style: TextStyle(color: Colors.white)), backgroundColor: Colors.blueAccent)
                ],
              ),
            ),
            
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red.shade50,
                foregroundColor: Colors.red,
                minimumSize: const Size(double.infinity, 50),
                elevation: 0,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))
              ),
              child: const Text('Logout'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12, left: 4),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black87)),
      ),
    );
  }

  Widget _buildInfoCard(List<Widget> children) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
      child: Column(children: children),
    );
  }

  Widget _infoRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 20, color: Colors.blueAccent),
          const SizedBox(width: 15),
          Text(label, style: const TextStyle(color: Colors.grey, fontSize: 13)),
          const Spacer(),
          Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
        ],
      ),
    );
  }

  Widget _medicationItem(String name, String note) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          const Icon(Icons.medication, color: Colors.orangeAccent),
          const SizedBox(width: 15),
          Text(name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)),
          const Spacer(),
          Text(note, style: const TextStyle(color: Colors.grey, fontSize: 12)),
        ],
      ),
    );
  }
}
