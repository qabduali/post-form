import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <div className="footer">
      <h4>Developed by Damir Kabdualiyev</h4>
      <div>
        <GitHubIcon onClick={() => window.open('https://github.com/qabduali', '_blank')} />
        <GoogleIcon onClick={() => (window.location.href = 'mailto:damirking29@gmail.com')} />
        <LinkedInIcon
          onClick={() => window.open('https://www.linkedin.com/in/damir-kabdualiyev/', '_blank')}
        />
      </div>
      <p>July 29, 2022</p>
    </div>
  );
};

export default Footer;
