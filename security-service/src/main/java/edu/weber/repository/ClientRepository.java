package edu.weber.auth.repository;

import edu.weber.auth.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// TODO
@Repository
public interface ClientRepository extends JpaRepository<Client, String> {

	Client findByClientId(String clientId);

}
