package edu.weber.auth.model;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.provider.ClientDetails;

/**
 * Implementation of the Spring Security `ClientDetails` interface
 * The class represents the details of a client that has been registered with the authorization server.
 * The constructor takes a Client object as input parameter and initializes the client field with it.
 */
public class ClientDetailsImpl implements ClientDetails {

	// Serial version UID for serialization purposes
	private static final long serialVersionUID = -5294562011836131914L;

	// The client object that stores the client details
	private Client client;

	/**
	 * Constructor for ClientDetailsImpl
	 * @param client the client object containing the client details.
	 */
	public ClientDetailsImpl(Client client) {
		System.out.println("inside client details impl" + client.getClientId());
		this.client = client;
	}

	// Override methods from the `ClientDetails` interface to provide the client details
	@Override
	public Integer getAccessTokenValiditySeconds() {
		return this.client.getAccessTokenValidity();
	}

	// All the methods below implement CRUD functionality.

	@Override
	public Map<String, Object> getAdditionalInformation() {
		Map<String, Object> additionalInfo = new HashMap<String, Object>();
		additionalInfo.put("client_id", client.getId());
		//TODO add needed key-value pairs
		return additionalInfo;
	}

	@Override
	public Collection<GrantedAuthority> getAuthorities() {
		
		List<GrantedAuthority> ga=new ArrayList<GrantedAuthority>();
		ga.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
		return ga;
	}

	@Override
	public Set<String> getAuthorizedGrantTypes() {
		
		 String[]  gt=this.client.getAuthorizedGrantTypes().split(",");
		 
		 Set<String> gts=new HashSet<String>();
		 
		 for(String s:gt)
		 {
			 gts.add(s);
		 }
		 return gts;
	}

	@Override
	public String getClientId() {
		return this.client.getClientId(); 	
	}

	@Override
	public String getClientSecret() {
		return this.client.getClientSecret();
	}

	@Override
	public Integer getRefreshTokenValiditySeconds() {
		return this.client.getRefreshTokenValidity();
	}

	@Override
	public Set<String> getRegisteredRedirectUri() {
		
		String[]  gt=this.client.getWebServerRedirectUri().split(",");
		 
		 Set<String> gts=new HashSet<String>();
		 
		 for(String s:gt)
			 gts.add(s);
		 
		 return gts;
	}

	@Override
	public Set<String> getResourceIds() {
		
		String[]  gt=this.client.getResourceId().split(",");
		 
		 Set<String> gts=new HashSet<String>();
		 
		 for(String s:gt)
			 gts.add(s);
		 
		 return gts;
	}

	@Override
	public Set<String> getScope() {

		String[]  gt=this.client.getScope().split(",");
		 
		 Set<String> gts=new HashSet<String>();
		 
		 for(String s:gt)
			 gts.add(s);
		 
		 return gts;
	}

	@Override
	public boolean isAutoApprove(String arg0) {
		//TODO: Add conditions for Auto Approval
		return false;
	}

	@Override
	public boolean isScoped() {
		//TODO: Add conditions for the client being scoped (has a specific set of authorized scopes)
		return true;
	}

	@Override
	public boolean isSecretRequired() {
		//TODO: Add conditions for secret being required
		return true;
	}

}
