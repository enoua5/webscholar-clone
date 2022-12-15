package edu.weber.auth.service;

import edu.weber.auth.model.Client;
import edu.weber.auth.model.ClientDetailsImpl;
import edu.weber.auth.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.stereotype.Service;
// TODO
// load clients from DB
@Service
public class ClientDetailsServiceImpl implements ClientDetailsService {
	
	@Autowired
	private ClientRepository clientRepository;


	// CliendDetails is needed, instead of the client itself
	@Override
	public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {

		Client client = clientRepository.findByClientId(clientId);
		
		if(client == null)
		{
			throw new ClientRegistrationException("client with "+clientId +" is not available");
		}

		return new ClientDetailsImpl(client);
	}

}
