import { doc, collection, getDoc, setDoc, updateDoc, query, where, getDocs, increment, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/clientApp';

// Generate a unique referral code
const generateReferralCode = async (userId) => {
  try {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let referralCode = '';
    
    // Generate 8-character random code
    for (let i = 0; i < 8; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    // Store the referral code in user's document
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      referralCode: referralCode
    });
    
    return referralCode;
  } catch (error) {
    console.error('Error generating referral code:', error);
    throw error;
  }
};

// Record a new referral
const recordReferral = async (referrerCode, referredUserId) => {
  try {
    // Find referrer by their code
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('referralCode', '==', referrerCode));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Invalid referral code');
    }
    
    const referrerDoc = querySnapshot.docs[0];
    const referrerId = referrerDoc.id;
    
    // Create referral record
    const referralData = {
      referrerId: referrerId,
      referredId: referredUserId,
      timestamp: new Date(),
      status: 'active',
      rewardPaid: false
    };
    
    await addDoc(collection(db, 'referrals'), referralData);
    
    // Update referrer's stats
    const referrerRef = doc(db, 'users', referrerId);
    await updateDoc(referrerRef, {
      referralCount: increment(1),
      totalReferralEarnings: increment(5) // Assuming 5 is the reward amount
    });
    
    return true;
  } catch (error) {
    console.error('Error recording referral:', error);
    throw error;
  }
};

// Get referral details for a user
const getReferralDetails = (userId, callback) => {
  try {
    // Get user's referral information
    const userRef = doc(db, 'users', userId);
    
    const unsubscribe = onSnapshot(userRef, async (userDoc) => {
      if (!userDoc.exists()) {
        callback(null);
        return;
      }
      
      const userData = userDoc.data();
      
      // Get list of referred users
      const referralsRef = collection(db, 'referrals');
      const q = query(referralsRef, where('referrerId', '==', userId));
      const referralsSnapshot = await getDocs(q);
      
      const referrals = [];
      referralsSnapshot.forEach((doc) => {
        referrals.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      const referralDetails = {
        referralCode: userData.referralCode || null,
        referralCount: userData.referralCount || 0,
        totalEarnings: userData.totalReferralEarnings || 0,
        referrals: referrals
      };
      
      callback(referralDetails);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error fetching referral details:', error);
    callback(null);
    return null;
  }
};

export { generateReferralCode, recordReferral, getReferralDetails };