



const PerfilHacedorApp = ({ }) => {


    const [key, setKey] = useState('home');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Detalles del perfil">
                <Sonnet />
            </Tab>
            <Tab eventKey="profile" title="Agregar Habilidades">
                <Sonnet />
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
                <Sonnet />
            </Tab>
        </Tabs>
    );

    render(<ControlledTabs />);

}
export default PerfilHacedorApp;