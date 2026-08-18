package com.infosys.lostFoundApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.infosys.lostFoundApplication.bean.LostfoundUser;

import com.infosys.lostFoundApplication.dao.LostfoundUserRepository;

@Service
public class LostfoundUserService implements UserDetailsService{
	@Autowired
	private LostfoundUserRepository repository;
	
	private String userId;
	private String role;
	private LostfoundUser user;
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public LostfoundUser getUser() {
		return user;
	}

	public void setUser(LostfoundUser user) {
		this.user = user;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
    //save a new user in database
	public void save(LostfoundUser user1) {
		repository.save(user1);
	}
	//get all students list
	public List<LostfoundUser> getAllStudents(){
		return repository.getAllStudents();}
	
	// Delete a user by username
	public void deleteUser(String username) {
	    repository.deleteById(username);
	}
	// validate an existing user from database
		@Override
		public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
			java.util.Optional<LostfoundUser> opt = repository.findById(username);
			LostfoundUser found = null;
			if (opt.isPresent()) {
				found = opt.get();
			} else {
				opt = repository.findByEmail(username);
				if (opt.isPresent()) {
					found = opt.get();
				}
			}
			if (found == null) {
				throw new UsernameNotFoundException("User not found: " + username);
			}

			this.user = found;
			this.userId = found.getUsername();
			this.role = found.getRole();
			return found;
		}
}
