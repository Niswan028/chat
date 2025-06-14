const supabase = require('../config/supabase');


exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('login')
      .insert([{ username, email, password }]);

    if (error) {
      console.error('Signup error:', error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: 'User registered', user: data });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('login')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single(); 

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }


    res.status(200).json({ message: 'Login successful', user: { username: data.username, email: data.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
